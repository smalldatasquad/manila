var test = "http://blueblueblue.com/"


var newTab;


//http://vps.provolot.com:5000/get_tab?tabroom=surfclub
newTab = function() {
	$.ajax({
	    url: "http://vps.provolot.com/manila_api/get_tab?tabroom=surfclub",
	    success: function(response) {
	        console.log('SUCCESS');
	        window.location = response;
	    },
	    error: function(xhr) {
	        console.log('FAILURE');
	    }
	});
};

 $( document ).ready(function() {
    newTab();
  });




// newTab = function() {
//         	$.get('get_tab', { tabroom: 'surfclub' }, function(data) {
    	
// 	});
// };





//window.location = newTab;

console.log('new-tab.js --> IS RUNNING');