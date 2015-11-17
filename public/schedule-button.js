

$( ".schedule-button" ).on( "click", function() {
  console.log('schedule button clocked');

  var host = window.location.host;

  window.location.replace("http://" + host + "/admin/" + randString());
})

function randString() {
  return new Array(25).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);})
}
