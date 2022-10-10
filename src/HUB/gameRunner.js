'use strict';

const Haiku = require('../client/lib/Haiku.js');

const sendToAllPlayers = (roster, event, payload) => {
  for(let client of roster.clientList) {
    console.log("username", client.profile.username)
    console.log("client id", client.io.id)
    console.log(payload)
    client.io.emit(event, payload)
  }
}

const playersJoinRoom = (roster) => {
  for(let client of roster.clientList) {
    client.io.join(roster.roomId)
  }
}

const handleGame = (haikuSocket, roster, gameId) => {
  const server = haikuSocket;
  console.log("handle Game")
  playersJoinRoom(roster);
  const theHaiku = new Haiku();
  
  
  let turn = 0;
  const createPayload = () => {
  let payload = {
    friends: roster.clientList.map((client) => client.profile.username),
    turn,
    haiku: theHaiku.toJSON(),
  }
    return payload;
  }
  
  // server.to(gameId).emit('game-start', payload);
  let payload = createPayload();

  const handlePlayerTurn = (client) => (payload) => {
      console.log(payload)
      if(theHaiku.tryWord(payload.word)) {
        theHaiku.acceptWord()
        console.log(theHaiku.toJSON())
        console.log("EMIT: next-turn to", gameId)
        turn++;
        server.to(gameId).emit('next-turn', createPayload());
      } else {
        client.io.emit('word-not-accepted', {word: payload.word})
      }
  }
  for(let client of roster.clientList){
    client.io.on('turn', handlePlayerTurn(client))
  }
  server.to(gameId).emit('game', payload);
  // socket.emit('end', payload);
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
