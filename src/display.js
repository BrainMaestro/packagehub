var tableHeaders = ['Name', 'Version'];

function display(deps, devDeps, name) {
  var readme = document.querySelector('.markdown-body.entry-content');

  if (! isEmpty(deps)) {
    readme.appendChild(addHeader('Dependencies (' + name + ')'));
    readme.appendChild(createDependencyTable(deps));
  }

  if (! isEmpty(devDeps)) {
    readme.appendChild(addHeader('Dev Dependencies'));
    readme.appendChild(createDependencyTable(devDeps));
  }
}

function addHeader(text) {
  var header = document.createElement('h2');
  header.textContent = text;

  return header;
}

function createDependencyTable(deps) {
  var table = document.createElement('table');
  tableHeaders.forEach(addTableHeader);

  var body = document.createElement('tbody');
  table.appendChild(body);

  for (dep in deps) {
    var row = document.createElement('tr');
    row.appendChild(getName(dep));
    row.appendChild(getVersion(deps[dep]));
    body.appendChild(row);
  }

  return table;

  function addTableHeader(header) {
    var tableHeader = document.createElement('th');
    tableHeader.textContent = header;
    table.appendChild(tableHeader);
  }
}

function getName(name) {
  var td = document.createElement('td');
  td.textContent = name;

  return td;
}

function getVersion(version) {
  var td = document.createElement('td');
  var code = document.createElement('code');
  code.textContent = version;
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
