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
let users = {
  
}
io.on('connection', function(socket){
  socket.id in users ? null : users[socket.id] = socket
  // 当前在线
  io.emit('all',Object.keys(users).length)
  socket.broadcast.emit('self','welcome')
  socket.on('chat',function(msg,id){
    socket.emit('server', msg);
  })
  console.log(users)
  socket.on('disconnect',function(){
    delete users[socket.id]
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});