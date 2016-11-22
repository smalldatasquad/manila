
var loadScribbleOnPage = function(response) {
    console.log(response['scribbleimgurl'] + "###");
    $('<img id="manilascribble" style="position:absolute;top:0; left: 0;z-index: 1000; pointer-events:none;" />').appendTo($("body"));
    $("#manilascribble").attr("src", response['scribbleimgurl']);
}


$( document ).ready(function() {
    $.ajax({
        url: window.location.protocol + "//vps.provolot.com/manila_api/get_tab?tabroom=surfclub",
        success: function(response) {
            if(response['url'] == window.location.href && response['scribbleimgurl'] != null) {
                loadScribbleOnPage(response);
            }
        },
        error: function(xhr) {  console.log('FAILURE');    }
    });

});
