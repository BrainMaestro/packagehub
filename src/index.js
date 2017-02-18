window.packageConfig.forEach(function (config) {
  var details = getFileDetails(config.file);
  if (! details) return;

  window.parse(details.href, config, window.display);
});

function getFileDetails(file) {
  return document.querySelector('.files [title="' + file + '"]');
}
