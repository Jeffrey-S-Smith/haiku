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
    socket.join(payload.clientId);
    console.log('Registered in room :', payload.clientId);
    clientList.push(payload.clientName);
    if(clientList.length === 3){
      //start the game
      handleGame(clientList);
    }
  });
});


// socket.emit('join', { clientId: 'Haiku Game 1', clientName: 'Jackson' })

