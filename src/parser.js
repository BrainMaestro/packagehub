function parse(url, config, callback) {
  getPackageData(url, getDependencies);

  function getDependencies(text) {
    var parseFormat = getParser(config.format);
    var packageData = parseFormat(text);

    var deps = packageData[config.keys[0]];
    var devDeps = packageData[config.keys[1]];
    callback(deps, devDeps, config.name, config.registry);
  }
}

function getPackageData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", listener);
  xhr.open("GET", url);
  xhr.send();

  function listener() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.responseText, 'text/html');
    var blob = doc.querySelector('.blob-wrapper');

    callback(blob.textContent);
  }
}

function getParser(format) {
  switch (format) {
    case 'json':
    default:
      return parseJSON;
  }
}

function parseJSON(text) {
  return JSON.parse(text);
}

window.parse = parse;
