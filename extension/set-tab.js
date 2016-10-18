console.log('set-tab.js');

var currentUrl = window.location.href;

var setTab;

setTab = function(){
	$.ajax({
    url: "//vps.provolot.com/manila_api/set_tab?tabroom=surfclub&url="+currentUrl,
    success: function(response) {
        console.log('SUCCESS');
        console.log('________________________________________________');
        console.log('________________________________________________');
        console.log('THIS IS WILL BE SENT TO THE DATABASE!: ',currentUrl);
    },
    error: function(xhr) {
        console.log('FAILURE');
    }
});
}

setTab();





// imageData = canv.elt.toDataURL();
//
// var blobBin = atob(imageData.split(',')[1]);
// var array = [];
// for (var i = 0; i < blobBin.length; i++) {
//   array.push(blobBin.charCodeAt(i));
// }
// var imageFile = new Blob([new Uint8Array(array)], {
//   type: 'image/png'
// });
//
// var formData = new FormData();
// formData.append('userPhoto', imageFile);
//
// $.ajax({
//  // url: "http://107.170.164.22/api/photo",
//   url: "https://doppel.camera/api/photo",
//   type: "POST",
//   data: formData,
//   processData: false,
//   contentType: false,
//   enctype: 'multipart/form-data',
//   success: function(data) {
//    console.log(data);
//    gotNewImage(data, 0);
//   },
//   error: startOver
// });











// chrome.runtime.onMessage.addListener(
//   function(message) {
//
//   	console.log('Button clicked!: ', message);
//   	setTab();
//
//    // $('*').css({'color': 'blue'});
//   }
// );
