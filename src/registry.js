(function () {
  var baseUrl = 'https://libraries.io/api/';

  function getExtraPackageData(registry, packageName, callback) {
    var url = baseUrl + registry + '/' + encodeURIComponent(packageName);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', listener);
    xhr.open('GET', url);
    xhr.send();

    function listener() {
      var data = JSON.parse(this.responseText);
      callback(data.latest_release_number, data.description, data.repository_url);
    }
  }

  window.getExtraPackageData = getExtraPackageData;
})();
