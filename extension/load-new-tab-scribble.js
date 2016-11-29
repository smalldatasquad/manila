// TODO: these options across (new-tab.js, set-tab.js, load-new-tab-scribble.js) need to be shared & set in local storage by options.html, etc
var manifest = chrome.runtime.getManifest();
var opts = {};
opts.TABROOM = manifest.settings.tabroom;
opts.get_tab_url = "//vps.provolot.com/manila_api/get_tab?tabroom=" + opts.TABROOM;


var onSuccessLoadScribbleOnPage = function(response) {
    console.log("### loading " + response['scribbleimgurl'] + "###");

    $('<img id="manilascribble" style="position:absolute;top:0; left: 0;z-index: 1000; pointer-events:none;" />').appendTo($("body"));
    $("#manilascribble").attr("src", response['scribbleimgurl']);
}

var checkIfNewTab = function(onSuccess) {
    $.ajax({
        url: window.location.protocol + opts.get_tab_url,
        success: function(response) {
            if(response['url'] == window.location.href && response['scribbleimgurl'] != null) {
                onSuccess(response);
            }
        },
        error: function(xhr) {  console.log('FAILURE');    }
    });
}


$( document ).ready(function() {
    console.log("checking");
    checkIfNewTab(onSuccessLoadScribbleOnPage)
});
