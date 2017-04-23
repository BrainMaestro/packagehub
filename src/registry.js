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
      var homepage = data.repository_url.indexOf('.git') === -1
        ? data.repository_url
        : data.homepage

      callback(data.latest_release_number, data.description, homepage)
    }
  }

  window.getExtraPackageData = getExtraPackageData
})()
