var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var userList = {};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('add_user', function(new_user) {
    userList[new_user.name] = {
      socket: this,
      publicKey: new_user.publicKey
    };
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});

app.use(express.static('public'));
