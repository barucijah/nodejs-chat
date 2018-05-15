const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',function (socket) {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined')
    );

    socket.on('createMessage',function (message,callback) {
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('ovo je sa servera');
        /*socket.broadcast.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });*/
    });

    socket.on('disconnect',function () {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));
server.listen(port, function () {
    console.log("Server has started on port 3000");
});