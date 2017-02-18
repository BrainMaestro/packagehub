function npm(registry, packageName, callback) {
  var url = registry + packageName + '/latest';
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", listener);
  xhr.open("GET", url);
  xhr.send();

  function listener() {
    var data = JSON.parse(this.responseText);
    callback(data.version, data.description, data.homepage);
  }
}

function get(configName, registry, packageName, callback) {
  switch (configName) {
    case 'npm':
      return npm(registry, packageName, callback);
  }
}

function request(url) {

}

window.registry = {
  get: get,
};
