;(function() {
  var tableHeaders = ['Name', 'Version', 'Latest', 'Description']

  function display(deps, devDeps, config) {
    var readme = document.querySelector('.markdown-body.entry-content')
    var license = document.querySelector('#user-content-license')
    var header = document.createElement('h2')
    var table = document.createElement('table')
    var body = document.createElement('tbody')

    header.textContent = 'Dependencies (' + config.name + ')'
    header.title = 'Toggle ' + config.name + ' table display'
    header.onclick = toggleTable
    header.style.display = 'none'
    table.style.display = 'none'
    tableHeaders.forEach(addTableHeader)
    table.appendChild(body)

    license = license ? license.parentNode : null
    readme.insertBefore(header, license)
    readme.insertBefore(table, license)

    addDependencies(body, deps, config.registry, config.name)
    addDependencies(body, devDeps, config.registry, config.name, true)

    function addTableHeader(header) {
      var tableHeader = document.createElement('th')
      tableHeader.textContent = header
      table.appendChild(tableHeader)
    }

    function toggleTable() {
      toggle(table)
    }
  }

  function addDependencies(body, deps, registry, name, dev) {
    var className = name + (dev ? 'dep' : 'devDep')
    if (deps) {
      body.appendChild(subHeader(dev, className))
    }

    var dependencies = []
    for (depName in deps) {
      dependencies.push({ name: depName, platform: registry })
    }

    var rows = {}
    for (depName in deps) {
      var row = document.createElement('tr')
      row.className = className
      addName(row, depName)
      addVersion(row, deps[depName])
      addVersion(row, '-')
      row.appendChild(document.createElement('td')) // description
      body.appendChild(row)
      rows[depName] = row
    }

    chrome.storage.local.get('key', function(results) {
      if (!results.key) {
        for (depName in deps) {
          window.getExtraPackageData(
            registry,
            depName,
            addExtraData.bind(rows[depName])
          )
        }
        return
      }

      window.getAllExtraPackageData(
        registry,
        dependencies,
        results.key,
        function(data) {
          data.forEach(function(dep) {
            var homepage =
              dep.repository_url.indexOf('.git') === -1
                ? dep.repository_url
                : dep.homepage
            addExtraData.call(
              rows[dep.name],
              dep.latest_release_number,
              dep.description,
              homepage
            )
          })
        }
      )
    })
  }

  function subHeader(dev, className) {
    var row = document.createElement('tr')
    var td = document.createElement('td')
    var header = document.createElement('strong')
    var icons = getIcons()

    header.textContent = dev
      ? 'Development Dependencies'
      : 'Project Dependencies'
    td.colSpan = tableHeaders.length
    row.style.cursor = 'pointer'
    row.onclick = toggleDependencies
    td.appendChild(header)
    var icon = document.createElement('div')
    icon.style.float = 'right'
    icon.appendChild(icons.open)
    td.appendChild(icon)
    row.appendChild(td)

    return row

    function toggleDependencies() {
      var rows = document.getElementsByClassName(className)
      for (var i = 0; i < rows.length; i++) {
        toggle(rows[i])
      }
      var icon = td.getElementsByTagName('div')[0]
      var removedChild = icon.removeChild(icon.children[0])
      icon.appendChild(removedChild === icons.open ? icons.closed : icons.open)
    }
  }

  function addName(row, name) {
    var td = document.createElement('td')
    var anchor = document.createElement('a')
    anchor.textContent = name
    td.appendChild(anchor)
    row.appendChild(td)
  }

  function addVersion(row, version) {
    var td = document.createElement('td')
    var code = document.createElement('code')
    if (typeof version === 'object') {
      version = version.version || version.path || '-'
    }
    code.textContent = version
    td.appendChild(code)
    row.appendChild(td)
  }

  function addExtraData(latestVersion, description, homepage) {
    data = this.getElementsByTagName('td')
    if (homepage) {
      data[0].children[0].setAttribute('href', homepage)
    }
    data[2].children[0].textContent = latestVersion
    data[3].textContent = description
    var table = this.parentNode.parentNode
    var header = table.previousSibling

    table.style.display = ''
    header.style.display = ''
    header.style.cursor = 'pointer'
  }

  function toggle(element) {
    element.style.display = element.style.display === 'none' ? '' : 'none'
  }

  function getIcons() {
    var open = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    open.setAttribute('class', 'octicon octicon-chevron-down')
    open.setAttribute('viewBox', '0 0 10 16')
    open.setAttribute('version', '1.1')
    open.setAttribute('width', '15')
    open.setAttribute('height', '26')
    open.setAttribute('aria-hidden', 'true')
    open.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    )
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('fill-rule', 'evenodd')
    path.setAttribute('d', 'M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z')
    open.appendChild(path)

    var closed = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    closed.setAttribute('class', 'octicon octicon-chevron-right')
    closed.setAttribute('viewBox', '0 0 8 16')
    closed.setAttribute('version', '1.1')
    closed.setAttribute('width', '12')
    closed.setAttribute('height', '24')
    closed.setAttribute('aria-hidden', 'true')
    closed.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    )
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('fill-rule', 'evenodd')
    path.setAttribute('d', 'M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3z')
    closed.appendChild(path)

    return { open: open, closed: closed }
  }

  window.display = display
})()
