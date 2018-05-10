const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',function (socket) {
    console.log('new user connected');

    socket.emit('newMessage',{
        from: 'mike@hotmail.com',
        text:'hello',
        createAt:123
    });

    socket.on('createMessage',function (message) {
        console.log('createMessage',message);
    });

    socket.on('disconnect',function () {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));
server.listen(port, function () {
    console.log("Server has started on port 3000");
});