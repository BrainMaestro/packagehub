;(function() {
  window.packageConfig.forEach(showDependencies)

  function showDependencies(config) {
    var file = document.querySelector('.files [title="' + config.file + '"]')
    if (!file) return

    var link = file.href
    window.parse(link, config, window.display)
  }
})()
