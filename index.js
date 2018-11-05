const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');

});


server.listen(port, function() {
  console.log('Listening on port ' + port);

  //listening
  io.on('connection', function (socket) {
    console.log('User Connected!');

    socket.on('newMessage', function(msgObject){
      io.emit('newMessage', msgObject);
    });

    socket.on('newClient', function(name){
      io.emit('newClient', name);

    });
  });

});
