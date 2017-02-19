function parse(url, config, callback) {
  getPackageData(url, getDependencies);

  function getDependencies(text) {
    var packageData = config.parse(text);

    var deps = packageData[config.keys[0]];
    var devDeps = packageData[config.keys[1]];
    callback(deps, devDeps, config);
  }
}

function getPackageData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', listener);
  xhr.open('GET', url);
  xhr.send();

  function listener() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.responseText, 'text/html');
    var blob = doc.querySelector('.blob-wrapper');

    callback(blob.textContent);
  }
}

function json(text) {
  return JSON.parse(text);
}

window.parse = parse;
window.parser = {
  json: json,
};
