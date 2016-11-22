console.log('background version 1');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  var tabId = tab.id;
	console.log('clicked browserAction in tab id: ',tabId);

  var message = {"clicked": true };

  // Send a message to the active tab
  chrome.tabs.sendMessage(tabId, message);
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("tabupdated");
//    alert("hoo" + tabId + " " + changeInfo.url + changeInfo.status );
/*    alert(tab.url);
    if(window.location.href != 'undefined' && changeInfo.status == 'complete') {
        alert("oohbaby");
    } */
/*  chrome.tabs.executeScript(tabId, { 
      code: 'console.log("yeahbaby");'
  });
*/
});

