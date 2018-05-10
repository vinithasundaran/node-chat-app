const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');


const {generateMessage,generateLocationMessage} = require('./public//utils/message');

var app = express();

var publicPath = path.join(__dirname,'/public');

app.use(express.static(publicPath));

var server = http.createServer(app);
 var io = socket(server);

 io.on('connection', (socket) =>{
     console.log('New server connection');
     socket.emit('newMessage',generateMessage('Admin','Welcome to the app!'));

     socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined!'));
     
     socket.on('disconnect',()=>{
         console.log('User disconnected');
     });

     socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from,message.text));

        callback('Acknowledgement done');
     });

     socket.on('createLocationMessage',(position)=>{
         console.log(position);
         io.emit('newLocationMessage',generateLocationMessage('Admin',position.lat,position.lon));
     });

    });



server.listen('3000', () => {
    console.log('Conected to server');
});

