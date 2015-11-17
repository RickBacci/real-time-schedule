

$( ".schedule-button" ).on( "click", function() {
  console.log('schedule button clocked');

  window.location.replace("http://localhost:3000/admin/" + randString());
})

function randString() {
  return new Array(25).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);})
}
