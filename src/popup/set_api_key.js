const browser = window.chrome || window.browser
showApiKey()

function setApiKey(apiKey) {
  browser.storage.local.set({ key: apiKey }, showApiKey)
}

function showApiKey() {
  browser.storage.local.get('key', function(results) {
    document.getElementById('current-api-key').textContent = results.key
  })
}

document.getElementById('set-api-key-button').onclick = function(event) {
  var input = document.getElementById('set-api-key-input')
  setApiKey(input.value)
  input.value = ''
}
