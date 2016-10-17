
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('marker button clicked');
  chrome.tabs.executeScript({
    file: "marker.js"
    // console.log('should be marking');

  });
});
