;(function() {
  var baseUrl = 'https://libraries.io/api/'

  function getExtraPackageData(registry, packageName, callback) {
    var url = baseUrl + registry + '/' + encodeURIComponent(packageName)
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', listener)
    xhr.open('GET', url)
    xhr.send()

    function listener() {
      var data = JSON.parse(this.responseText)
      var homepage =
        data.repository_url.indexOf('.git') === -1
          ? data.repository_url
          : data.homepage

      callback(data.latest_release_number, data.description, homepage)
    }
  }

  function getAllExtraPackageData(registry, dependencies, apiKey, callback) {
    var url = baseUrl + '/check?api_key=' + apiKey
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', listener)
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ projects: dependencies }))

    function listener() {
      callback(JSON.parse(this.responseText))
    }
  }

  window.getExtraPackageData = getExtraPackageData
  window.getAllExtraPackageData = getAllExtraPackageData
})()
