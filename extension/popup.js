
function paint() {
  chrome.tabs.executeScript({
    file: 'othermarker.js'
  });
}

function setTheTab() {
  chrome.tabs.executeScript({
    file: 'set-tab.js'
  });
}

document.getElementById('paintButton').addEventListener('click', paint);

document.getElementById('setTabButton').addEventListener('click', setTheTab);
