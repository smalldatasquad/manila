


var successLoadImg = function(response) {
    console.log("SUCCESS! We're going to load an image and make it linkable");
    ///////////////////////////////
    console.log(response);
    var responseLink = response['url'];
    var responseImage = response['scribbleimgurl'];
    document.getElementById("Img").src = responseImage;
    ///////////////////////////////
    document.getElementById( "Img" ).onclick = function() {
        window.location = responseLink;
    };
}

var successLoadURL = function(response) {
    console.log("SUCCESS! We're going to load a url!");
/*      chrome.tabs.executeScript(null, { 
          code: 'alert("yoyo"); window.location.href="http://www.google.com"'
      });*/
    window.location = response['url'];
}

var newTab = function(successFunction) {
	$.ajax({
	    url: "http://vps.provolot.com/manila_api/get_tab?tabroom=surfclub",
	    success: successFunction,
        error: function(xhr) {
	        console.log('FAILURE');
	    }
	});

};

$( document ).ready(function() {
    newTab(successLoadURL);
});


console.log('new-tab.js --> IS RUNNING');
