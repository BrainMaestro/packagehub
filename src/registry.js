(function () {
  function getExtraPackageData(url, listener) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', listener);
    xhr.open('GET', url);
    xhr.send();
  }

  function npm(packageName, callback) {
    var url = registryConfig.npm + packageName + '/latest';
    getExtraPackageData(url, listener);

    function listener() {
      var data = JSON.parse(this.responseText);
      callback(data.version, data.description, data.homepage);
    }
  }

  function librariesIO(packageName, callback) {
    var url = registryConfig.librariesIO + this + '/' + encodeURIComponent(packageName);
    getExtraPackageData(url, listener);

    function listener() {
      var data = JSON.parse(this.responseText);
      callback(data.latest_release_number, data.description, data.repository_url);
    }
  }

  var registryConfig = {
    npm: 'https://registry.npmjs.org/',
    librariesIO: 'https://libraries.io/api/',
  };

  window.registry = {
    npm: npm,
    librariesIO: librariesIO,
  };
})();
