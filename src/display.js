var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

function display(deps, devDeps, config) {
  var readme = document.querySelector('.markdown-body.entry-content');
  var license = document.querySelector('#user-content-license');
  license = license ? license.parentNode : null;

  var header = document.createElement('h2');
  header.textContent = 'Dependencies (' + config.name + ')';
  readme.insertBefore(header, license);

  var table = document.createElement('table');
  tableHeaders.forEach(addTableHeader);
  var body = document.createElement('tbody');
  table.appendChild(body);

  addDependencies(body, deps, config.registry);
  addDependencies(body, devDeps, config.registry, true);
  readme.insertBefore(table, license);

  function addTableHeader(header) {
    var tableHeader = document.createElement('th');
    tableHeader.textContent = header;
    table.appendChild(tableHeader);
  }
}

function addDependencies(body, deps, registry, dev) {
  body.appendChild(subHeader(dev))

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
  td.colSpan = tableHeaders.length;
  header.textContent = dev ? 'Development Dependencies' : 'Project Dependencies';
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
