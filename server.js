const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, () => {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', (socket) => {
  //console.log('a user has connected');
  socket.on('username', (username) => {
    socket.username = username;
    io.emit('is_online', '<strong>' + socket.username + '</strong>' + ' joined the chat...');
  });

  socket.on('disconnect', (username) => {
    io.emit('is_online', '<strong>' + socket.username + '</strong>' + ' left the chat...')
  })

  socket.on('chat_message', (message) => {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  })
});
