var opts = {};
opts.get_tab_url =  "https://vps.provolot.com/manila_api/get_tab?tabroom=surfclub";

var onSuccessLoadURL = function(response) {
    console.log("SUCCESS! We're going to load a url!");
    window.location = response['url'];
}

var newTab = function(successFunction) {
	$.ajax({
        url: opts.get_tab_url,
	    success: successFunction,
        error: function(xhr) {
	        console.log('FAILURE');
	    }
	});

};

$( document ).ready(function() {
    newTab(onSuccessLoadURL);
});


console.log('new-tab.js --> IS RUNNING');
