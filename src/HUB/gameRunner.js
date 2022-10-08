'use strict';

const Haiku = require('../client/lib/Haiku.js');

const handleGame= (socket) => (clientList, gameId, server) => {
  let payload = {
    friends: clientList,
    turn: 0,
    haiku: new Haiku(),
  }
  while(!haikuChecker(payload.haiku.lines)){
    payload.turn++;

    server.to(gameId).emit('game', payload);
    socket.on('turn', (payload)=>{
      payload.haiku.acceptWord(payload);
    })
  }
  socket.emit('end', payload);
}

module.exports = {
  handleGame,
}

// let test = haikuChecker([['real','real','yes'],["surely", "bird", 'are', 'not', 'real'],['real','real','yes']])
// console.log(test);

// let newTest = lineChecker(['real','real','yes']);
// console.log(newTest)

// function lineChecker(arr){
//   let total = 0;
//   arr.map(input=> total += enSyllableChecker(input));
//   return total;
// }

// function haikuChecker(arr){
//   if(lineChecker(arr[0])===5 && lineChecker(arr[1])=== 7 && lineChecker(arr[2])===5){
//     return true
//   } else {
//     return false
//   }
// }
