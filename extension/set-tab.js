jQuery.fn.exists = function(){return jQuery(this).length>0;}

console.log('set-tab.js');

var currentUrl = window.location.href;

var setLinkTab = function(){
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

var setCanvasTab = function() {
    html2canvas($("#manilacanvas"), {
        onrendered: function(canvas) {
            var canvasdata = canvas.toDataURL("image/png");
            canvasdata = canvasdata.replace('data:image/png;base64,', '');
            canvas = document.getElementById('manilacanvas');
            var url = location.protocol + "//vps.provolot.com/manila_api/set_scribbled_tab";
            var g = $.ajax({
                type: 'POST',
                url: url,
                data: {
                    imgBase64: canvasdata,
                    timestamp: Math.floor(Date.now() / 1000),
                    filename: "manila-drawing-" + Math.floor(Date.now() / 1000) + ".png",
                    taburl: window.location.href,
                    tabroom: 'surfclub'
                }
            }).done(function(o) {
                console.log(o);
            }); //POSTDATA
        }
    });
}


if($("#manilacanvas").exists()) {
    setCanvasTab();
} else {
    setLinkTab();
}






// chrome.runtime.onMessage.addListener(
//   function(message) {
//
//   	console.log('Button clicked!: ', message);
//   	setTab();
//
//    // $('*').css({'color': 'blue'});
//   }
// );
