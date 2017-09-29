//express
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');

var fs = require('fs');

var bodyParser = require('body-parser');
var encodeParser = bodyParser.urlencoded({extended:false});

app.get('/', function(req, res)
{
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', function(req, res)
{
  res.redirect('back');
});

//socket
var spawn = require("child_process").spawn;
var process = spawn('python', ["test.py"]);

var dataStr = '';
process.stdout.on('data', function(data)
{
  dataStr += data.toString();
});

process.stdout.on('end', function()
{
  console.log(dataStr);
  dataStr = '';
});

process.stdin.write("ahahah\n");
process.stdin.end();

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket, pseudo)
{

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
    socket.broadcast.emit('new_msg', 
    { content: message, user: socket.pseudo, importance: '1'});
  });


});

server.listen(8080);
