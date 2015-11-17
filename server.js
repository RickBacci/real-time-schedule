var votes = {};

const http     = require('http');
const express  = require('express');

const app      = express();
var timeSlots = {};

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/admin/:id', (request, response) => {
  response.sendFile(__dirname + '/public/admin.html')
});

app.get('/schedule/:id', (request, response) => {
  response.sendFile(__dirname + '/public/schedule.html')
});


var port = process.env.PORT || 3000;
var server = http.createServer(app)
.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

const socketIo = require('socket.io');
const io       = socketIo(server);

io.on('connection', function(socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('statusMessage', 'You have connected.');

  // need to get the entire table for the user
  console.log(timeSlots)
  socket.emit('currentSchedule', timeSlots);

  socket.on('disconnect', function() {
    console.log('A user has disconnected.');
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });

  socket.on('createTimeSlot', function(timeslot) {

    timeSlots[timeslot.randUrl] = timeslot;

    io.sockets.emit('timeslotTable', timeSlots);
  });

  socket.on('send-TimeSlot-to-delete', function(timeslotInfo) {

    var timeslotId = timeslotInfo[0];
    var randUrl = timeslotInfo[1];

    console.log(timeslotId);

    timeSlots[randUrl] = ''

    io.sockets.emit('removeTimeslot', timeslotId);
  });

});


module.exports = server;
