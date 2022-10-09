'use strict';

const dotenv = require('dotenv')
if (process.env && process.env.NODE_ENV==="development"){
  dotenv.config({path: __dirname + '/.env.development'})
}

const { createServer } = require("http");
const { Server } = require("socket.io");
const {GameRoster, GameClient} = require("./GameRoster");
const STATIC_SERVER = process.env.APP_URL
const PORT = process.env.PORT || 3002;;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: STATIC_SERVER
  }
});

const server = io;
const haikuSocket = server.of('/haiku');
const { handleGame } = require('./gameRunner');
// let clientList = [];
const maxPlayers = 2;
const gameRosters = { }
console.log('Server is up!!! Port:', PORT);
haikuSocket.on('connection', (socket) => {
  console.log('New Client connected!!');

  socket.on('join', (payload) => {
    console.log("EVENT: join", payload)

    const username = payload.username;

    if(!gameRosters[payload.gameId]) gameRosters[payload.gameId]= new GameRoster(payload.gameId, maxPlayers)
    const roster = gameRosters[payload.gameId]

    if(!roster.isFull() && !roster.playerUsernameExists(username)) {
      socket.on("disconnect", (reason) => {
        console.log(`${username} left the game.`)
        roster.removeFromGameByUsername(username);
      })
    socket.join(payload.gameId);
      const client = new GameClient(socket)
      client.setUsername(username)
      roster.addToGame(client)
      console.log("EMIT: welcome", payload.username )
    socket.emit('welcome', {message:`Welcome to lightening Haiku ${payload.username}`})
    console.log(`Registered  ${payload.username} in room: ${payload.gameId}` );
      console.log(`clientList is now: ${roster.clientList.map(c=>c.profile.username)}`)

      if(roster.isFull()) {
      // if(clientList.length === 3){
      //start the game
        handleGame(haikuSocket, roster, payload.gameId);
      }
    }
    else if(roster.isFull()){
      console.log("EMIT: join-failed, max reached", payload)
      socket.emit('join-failed', {
        gameId: payload.gameId,
        message: `The game ${payload.gameId} is full.`
      })
    } else if(roster.playerUsernameExists(username)){
      console.log("EMIT: join-failed, username taken", payload)
      socket.emit('join-failed', {
        gameId: payload.gameId,
        message: `The the username ${payload.username} is taken.`
      })
    }

  });
});

server.listen(PORT, () => {
  console.log("listening on", PORT);
});

// socket.emit('join', { clientId: 'Haiku Game 1', clientName: 'Jackson' })

