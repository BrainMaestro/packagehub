var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

function display(deps, devDeps, config) {
  var readme = document.querySelector('.markdown-body.entry-content');
  var license = document.querySelector('#user-content-license');
  var header = document.createElement('h2');
  var table = document.createElement('table');
  var body = document.createElement('tbody');

  addDependencies(body, deps, config.registry);
  addDependencies(body, devDeps, config.registry, true);

  header.textContent = 'Dependencies (' + config.name + ')';
  tableHeaders.forEach(addTableHeader);
  table.appendChild(body);

  license = license ? license.parentNode : null;
  readme.insertBefore(header, license);
  readme.insertBefore(table, license);

  function addTableHeader(header) {
    var tableHeader = document.createElement('th');
    tableHeader.textContent = header;
    table.appendChild(tableHeader);
  }
}

function addDependencies(body, deps, registry, dev) {
  if (deps) {
    body.appendChild(subHeader(dev))
  }

  for (dep in deps) {
    var row = document.createElement('tr');
    row.appendChild(textData(dep));
    row.appendChild(versionData(deps[dep]));
    body.appendChild(row);

    registry(dep, addExtraData.bind(row));
  }
}

function subHeader(dev) {
  var row = document.createElement('tr');
  var td = document.createElement('td');
  var header = document.createElement('strong');

  header.textContent = dev ? 'Development Dependencies' : 'Project Dependencies';
  td.colSpan = tableHeaders.length;
  td.appendChild(header);
  row.appendChild(td);

  return row;
}

function textData(text) {
  var td = document.createElement('td');
  td.textContent = text;

  return td;
}

function versionData(version, link) {
  var td = document.createElement('td');
  var code = document.createElement('code');

  if (link) {
    var anchor = document.createElement('a');
    anchor.textContent = version;
    anchor.setAttribute('href', link);
    code.appendChild(anchor);
  } else {
    code.textContent = version;
  }

  td.appendChild(code);

  return td;
}

function addExtraData(latestVersion, description, homepage) {
  this.appendChild(versionData(latestVersion, homepage));
  this.appendChild(textData(description));
}

window.display = display;
