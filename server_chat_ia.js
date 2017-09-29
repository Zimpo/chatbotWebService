//express
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');

var fs = require('fs');

app.get('/', function(req, res)
{
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log(req.connection);
});

app.post('/', function(req, res)
{
  res.redirect('back');
});


//socket
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket, pseudo)
{
  //run script
  var PythonShell = require('python-shell');

  var pyshell = new PythonShell('test2.py', 
  {scriptPath:"./", mode:'text', pythonOptions: ['-u']});

  socket.on('new_user', function(pseudo)
  {
    console.log("new user = ", pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit('new_user', 
    { content: pseudo, importance: '1'});
  });

  socket.on('new_msg', function(message)
  {
    console.log(socket.pseudo + " : " + message);
    pyshell.send(message);
  }); 

  pyshell.on('message', function(message)
  {
    console.log(message);
    socket.emit('new_msg', { user: 'lisa', content: message });
  });
});

app.listen(3000);
//server.listen(3000);
