var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

function display(deps, devDeps, config) {
  var readme = document.querySelector('.markdown-body.entry-content');

  if (! isEmpty(deps)) {
    readme.appendChild(addHeader('Dependencies (' + config.name + ')'));
    readme.appendChild(createDependencyTable(deps, config.registry));
  }

  if (! isEmpty(devDeps)) {
    readme.appendChild(addHeader('Dev Dependencies'));
    readme.appendChild(createDependencyTable(devDeps, config.registry));
  }
}

function addHeader(text) {
  var header = document.createElement('h2');
  header.textContent = text;

  return header;
}

function createDependencyTable(deps, registry) {
  var table = document.createElement('table');
  tableHeaders.forEach(addTableHeader);

  var body = document.createElement('tbody');
  table.appendChild(body);

  for (dep in deps) {
    var row = document.createElement('tr');
    row.appendChild(getName(dep));
    row.appendChild(getVersion(deps[dep]));
    body.appendChild(row);

    registry(dep, addExtraData.bind(row));

    function addExtraData(latestVersion, description, homepage) {
      var td = document.createElement('td');
      td.textContent = latestVersion;
      this.appendChild(td);

      td = document.createElement('td');
      td.textContent = description;
      this.appendChild(td);
    }
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
