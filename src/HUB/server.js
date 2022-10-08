'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = io(PORT);
const haiku = server.of('/haiku');
const { handleGame } = require('./gameRunner');
let clientList = [];

haiku.on('connection', (socket) => {
  console.log('New Client connected!!');

  haiku.on('join', (payload) => {
    socket.join(payload.gameId);
    socket.emit('welcome', {message:`Welcome to lightening Haiku ${payload.username}`})
    console.log('Registered in room :', payload.gameId);
    clientList.push(payload.username);
    if(clientList.length === 3){
      //start the game
      handleGame(clientList, payload.gameId);
    }
  });
});


// socket.emit('join', { clientId: 'Haiku Game 1', clientName: 'Jackson' })

