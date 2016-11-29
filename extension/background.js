
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  var tabId = tab.id;
	console.log('clicked browserAction in tab id: ',tabId);

  var message = {"clicked": true };

  chrome.tabs.sendMessage(tabId, message);
});


