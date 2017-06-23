var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var userListSockets = {};
var userList = {};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('add_user', function(new_user) {
    userList[new_user.name] = new_user.publicKey;
    userListSockets[new_user.name] = this;
  });

  socket.on('get_users_list', function() {
    io.emit('get_users', userList);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});

app.use(express.static('public'));
