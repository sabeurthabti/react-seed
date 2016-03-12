javascript:(function(){

  if(typeof (window.jQuery || window.$) !== "undefined") {
    var script = document.createElement( 'script' );
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=releasetheKraken;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }  else {
    bookMarkIt();
  }

  function bookMarkIt() {
    $.post('https://sabeurlinks.herokuapp.com/new', {title: , ''})
  }

})();
