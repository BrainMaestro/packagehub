var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

function display(deps, devDeps, config) {
  var readme = document.querySelector('.markdown-body.entry-content');

  if (! isEmpty(deps)) {
    readme.appendChild(addHeader('Dependencies (' + config.name + ')'));
    readme.appendChild(addDependencyTable(deps, config.registry));
  }

  if (! isEmpty(devDeps)) {
    readme.appendChild(addHeader('Dev Dependencies'));
    readme.appendChild(addDependencyTable(devDeps, config.registry));
  }
}

function addHeader(text) {
  var header = document.createElement('h2');
  header.textContent = text;

  return header;
}

function addDependencyTable(deps, registry) {
  var table = document.createElement('table');
  tableHeaders.forEach(addTableHeader);

  var body = document.createElement('tbody');
  table.appendChild(body);

  for (dep in deps) {
    var row = document.createElement('tr');
    row.appendChild(textData(dep));
    row.appendChild(versionData(deps[dep]));
    body.appendChild(row);

    registry(dep, addExtraData.bind(row));

    function addExtraData(latestVersion, description, homepage) {
      this.appendChild(versionData(latestVersion, homepage));
      this.appendChild(textData(description));
    }
  }

  return table;

  function addTableHeader(header) {
    var tableHeader = document.createElement('th');
    tableHeader.textContent = header;
    table.appendChild(tableHeader);
  }
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

function isEmpty(obj) {
  for (name in obj) {
    return false;
  }

  return true;
}

window.display = display;
