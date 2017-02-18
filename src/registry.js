function getExtraPackageData(url, listener) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", listener);
  xhr.open("GET", url);
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

var registryConfig = {
  npm: 'https://registry.npmjs.org/',
};

window.registry = {
  npm: npm,
};
