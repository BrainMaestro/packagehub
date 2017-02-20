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

  function composer(packageName, callback) {
    var url = registryConfig.composer + packageName;
    getExtraPackageData(url, listener);

    function listener() {
      var data = JSON.parse(this.responseText)['results'][0];
      callback('-', data.description, data.repository);
    }
  }

  function librariesIO(packageName, callback) {
    var url = registryConfig.librariesIO + this + '/' + encodeURIComponent(packageName);
    getExtraPackageData(url, listener);

    function listener() {
      var data = JSON.parse(this.responseText);
      var version = data.latest_stable_release.number
      callback(version, data.description, data.repository_url);
    }
  }

  var registryConfig = {
    npm: 'https://registry.npmjs.org/',
    composer: 'https://packagist.org/search.json?q=',
    librariesIO: 'https://libraries.io/api/',
  };

  window.registry = {
    npm: npm,
    composer: composer,
    librariesIO: librariesIO,
  };
})();
