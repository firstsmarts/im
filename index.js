// ver express = require('express');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var inspect = require('util').inspect;
app.use(express.static('public'))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('self','welcome')
  socket.on('chat',function(msg,id){
    console.log('message: '+msg + id)
    socket.emit('server', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});