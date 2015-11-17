
$( "#create-timeslot-button" ).on( "click", function(event) {
  event.preventDefault();

  console.log('schedule button clocked');
  var date      = $('#date').val();
  var startTime = $('#start-time').val();
  var endTime   = $('#end-time').val();

  $('#date').val('');
  $('#start-time').val('');
  $('#end-time').val('');


  var randUrl= window.location.pathname.substr(7)

  socket.emit('createTimeSlot',
              debugger;
    { randUrl: randUrl,
      date: date,
      startTime: startTime,
      endTime: endTime
  });
  console.log("Date: " + date );
  console.log("Start time: " + startTime );
  console.log("End time: " + endTime );
  console.log("randUrl: " + randUrl );
})


