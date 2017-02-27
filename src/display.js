(function () {
  var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

  function display(deps, devDeps, config) {
    var readme = document.querySelector('.markdown-body.entry-content');
    var license = document.querySelector('#user-content-license');
    var header = document.createElement('h2');
    var table = document.createElement('table');
    var body = document.createElement('tbody');

    header.textContent = 'Dependencies (' + config.name + ')';
    header.title = 'Toggle ' + config.name + ' table display';
    header.onclick = toggleTable;
    header.style.display = 'none';
    table.style.display = 'none';
    tableHeaders.forEach(addTableHeader);
    table.appendChild(body);

    license = license ? license.parentNode : null;
    readme.insertBefore(header, license);
    readme.insertBefore(table, license);

    addDependencies(body, deps, config.registry, config.name);
    addDependencies(body, devDeps, config.registry, config.name, true);

    function addTableHeader(header) {
      var tableHeader = document.createElement('th');
      tableHeader.textContent = header;
      table.appendChild(tableHeader);
    }

    function toggleTable() {
      toggle(table);
    }
  }

  function addDependencies(body, deps, registry, name, dev) {
    var className = name + (dev ? 'dep' : 'devDep');
    if (deps) {
      body.appendChild(subHeader(dev, className))
    }

    for (depName in deps) {
      var row = document.createElement('tr');
      row.className = className;
      addName(row, depName);
      addVersion(row, deps[depName]);
      addVersion(row, '-');
      row.appendChild(document.createElement('td')); // description
      body.appendChild(row);

      window.getExtraPackageData(registry, depName, addExtraData.bind(row));
    }
  }

  function subHeader(dev, className) {
    var row = document.createElement('tr');
    var td = document.createElement('td');
    var header = document.createElement('strong');

    header.textContent = dev ? 'Development Dependencies' : 'Project Dependencies';
    td.colSpan = tableHeaders.length;
    row.style.cursor = 'pointer';
    row.onclick = toggleDependencies;
    td.appendChild(header);
    row.appendChild(td);

    return row;

    function toggleDependencies() {
      var rows = document.getElementsByClassName(className);
      for (var i = 0; i < rows.length; i++) {
        toggle(rows[i]);
      }
    }
  }

  function addName(row, name) {
    var td = document.createElement('td');
    var anchor = document.createElement('a');
    anchor.textContent = name;
    td.appendChild(anchor);
    row.appendChild(td);
  }

  function addVersion(row, version) {
    var td = document.createElement('td');
    var code = document.createElement('code');
    code.textContent = version;
    td.appendChild(code);
    row.appendChild(td);
  }

  function addExtraData(latestVersion, description, homepage) {
    data = this.getElementsByTagName('td');
    if (homepage) {
      data[0].children[0].setAttribute('href', homepage);
    }
    data[2].children[0].textContent = latestVersion;
    data[3].textContent = description;
    var table = this.parentNode.parentNode;
    var header = table.previousSibling;

    table.style.display = '';
    header.style.display = '';
    header.style.cursor = 'pointer';
  }

  function toggle(element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }

  window.display = display;
})();
