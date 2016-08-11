console.log('set-tab.js');

var currentUrl = window.location.href;



chrome.runtime.onMessage.addListener(
  function(message) {
    console.log('Button clicked!: ', message);
    console.log('________________________________________________');
    console.log('________________________________________________');
    console.log('THIS IS WILL BE SENT TO THE DATABASE!: ',currentUrl); 


//window.open(currentUrl);


   $('*').css({'color': 'blue'});



   //$('*').css('background-image', 'url(' + 'http://i.giphy.com/11Oz538wQaXWbC.gif' + ')');

    // $('*').css('background-image', 'url(' + 'https://s20.postimg.org/smrskw00d/heyyy.jpg' + ')');

  }
);


