'use strict';

const { enSyllableChecker } = require("syllable-checker");
const Haiku = require('./Haiku.js')


const handleGame = (socket) => (clientList) => {
  let payload = {
    friends: clientList,
    turn: 0,
    haiku: new Haiku(),
  }
  while(!haikuChecker(payload.haiku.lines)){
    payload.turn++;
    socket.emit('game', payload);
    socket.on('turn', (payload)=>{
      payload.haiku.acceptWord(payload);
    })
  }

}

function lineChecker(arr){
  let total = 0;
  arr.map(input=> total += enSyllableChecker(input));
  return total;
}

function haikuChecker(arr){
  if(lineChecker(arr[0])===5 && lineChecker(arr[1])=== 7 && lineChecker(arr[2])===5){
    return true
  } else {
    return false
  }
}


module.exports = {
  handleGame,
  lineChecker,
  haikuChecker,
}

// let test = haikuChecker([['real','real','yes'],["surely", "bird", 'are', 'not', 'real'],['real','real','yes']])
// console.log(test);

// let newTest = lineChecker(['real','real','yes']);
// console.log(newTest)
