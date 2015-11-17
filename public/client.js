var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function(message) {
  statusMessage.innerText = message;
});

var count = 1;

socket.on('timeslotTable', function(timeSlots) {
  var randUrl= window.location.pathname.substr(7)

  var timeslot = timeSlots[randUrl];

   $('#schedule-table-body').append(
     "<tr>"
       + "<td>"
         + timeslot.date
       + "</td>"
       + "<td>"
         + timeslot.startTime
       + "</td>"
       + "<td>"
         + timeslot.endTime
       + "</td>"
       + "<td>"
         + "<a id='timeslot-"
         + timeslot.randUrl
         + "-"
         + count
         + "'>Remove</a>"
       + "</td>"
     + "</tr>"
   );


  $('#schedule-table-body').on( "click", function(event) {
    event.preventDefault();

    var timeslotId = event.target.id

    console.log('remove button clicked for: ' + timeslotId);

    event.target.parentNode.parentNode.remove();

    socket.emit('send-TimeSlot-to-delete', randUrl);

  });
  count ++

});


$( "#create-timeslot-button" ).on( "click", function(event) {
  event.preventDefault();

  console.log('schedule button clicked');

  var date      = $('#date').val();
  var startTime = $('#start-time').val();
  var endTime   = $('#end-time').val();

  $('#date').val('');
  $('#start-time').val('');
  $('#end-time').val('');


  var randUrl= window.location.pathname.substr(7)

  socket.emit('createTimeSlot',
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

socket.on('removeTimeslot', function(timeslotId) {

  $("timeslot-" + timeslotId + "-1").remove();
});
