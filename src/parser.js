;(function() {
  function parse(url, config, callback) {
    getPackageData(url, getDependencies)

    function getDependencies(text) {
      var packageData = config.parse(text)

      var deps = filter(packageData[config.keys[0]], config.filter)
      var devDeps = filter(packageData[config.keys[1]], config.filter)
      callback(deps, devDeps, config)
    }
  }

  function getPackageData(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', listener)
    xhr.open('GET', url)
    xhr.send()

    function listener() {
      var parser = new DOMParser()
      var doc = parser.parseFromString(this.responseText, 'text/html')
      var blob = doc.querySelector('.blob-wrapper > table')

      callback(blob.textContent)
    }
  }

  function filter(deps, configFilter) {
    if (!configFilter) {
      return deps
    }

    for (name in deps) {
      if (!configFilter.test(name)) {
        delete deps[name]
      }
    }

    return deps
  }

  function json(text) {
    return JSON.parse(text)
  }

  function toml(text) {
    var nodes = window.toml.parse(text)
    return window.toml.compile(nodes)
  }

  window.parse = parse
  window.parser = {
    json: json,
    toml: toml
  }
})()
