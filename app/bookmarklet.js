javascript:(function(){

  if(typeof (window.jQuery || window.$) !== "undefined") {
    var script = document.createElement( 'script' );
    script.src = location.protocol +'//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=bookMarkIt;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }  else {
    bookMarkIt();
  }

  function bookMarkIt() {
    $.post(location.protocol + '//sabeurlinks.herokuapp.com/new',
    {title: document.title.substring(0, 30), url: window.location.href}
  ).done(function(data) {
    console.log(data);
  })
  .fail(function(err) {
console.log('error', err);
})
  }

})();
