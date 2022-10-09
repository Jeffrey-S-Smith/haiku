'use strict';

const Haiku = require('../client/lib/Haiku.js');

const handleGame= (socket) => (clientList, gameId, server) => {
  const theHaiku = new Haiku();

  const createPayload = () => {
    return {
      friends: clientList,
      turn: 0,
      haiku: theHaiku.toJson()
    };
  }
  // 1
  // send `game-starting` to all players
  // 2
  // send `turn` and haiku.toJson
  // start listening for `turn-response` event from clients
  //        listener will respond by sending `turn` event to clients
  socket.on('turn', (payload) => {
      const word = payload.word;
      theHaiku.tryWord(word);
      theHaiku.acceptWord();
      console.log(theHaiku.toJson())
  })

  console.log("in handleGame")
  socket.emit('game-starting');
  socket.emit('game', createPayload());
  // socket.to(gameId).emit('game', createPayload());


 /* 
  while(theHaiku.finished !== true){
    payload.turn++;

    server.to(gameId).emit('game', payload);
    socket.on('turn', (payload)=>{
      payload.haiku.acceptWord(payload);
    })
  }
  socket.emit('end', payload);
  */
}

module.exports = {
  handleGame,
}

// let test = haikuChecker([['real','real','yes'],["surely", "bird", 'are', 'not', 'real'],['real','real','yes']])
// console.log(test);

// let newTest = lineChecker(['real','real','yes']);
// console.log(newTest)


