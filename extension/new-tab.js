var test = "http://blueblueblue.com/"


var newTab;

var dummieResponse = "http://poohead.com/"

var responseLink;

//http://vps.provolot.com:5000/get_tab?tabroom=surfclub
newTab = function() {
	$.ajax({
	    url: "http://vps.provolot.com/manila_api/get_tab?tabroom=surfclub",
	    success: function(response) {
	        console.log('SUCCESS');
            ///////////////////////////////
            console.log(response);
	        responseLink = response['url'];
            responseImage = response['scribbleimgurl'];
            document.getElementById("Img").src = responseImage;
            ///////////////////////////////
	    },
	    error: function(xhr) {
	        console.log('FAILURE');
	    }
	});



    document.getElementById( "Img" ).onclick = function() {
        window.location = responseLink;
    };
};

 $( document ).ready(function() {
    newTab();
  });


console.log('new-tab.js --> IS RUNNING');
