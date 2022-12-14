"use strict";

const STATIC_SERVER = process.env.APP_URL;

const { createServer } = require("http");
const { Server } = require("socket.io");
const { GameRoster, GameClient } = require("./GameRoster");

const randomGameId = require("./random-slug");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: STATIC_SERVER,
  },
});

const server = io;
const haikuSocket = server.of("/haiku");
const { handleGame } = require("./gameRunner");
// let clientList = [];
const maxPlayers = 3;
const gameRosters = {};
haikuSocket.on("connection", (socket) => {
  console.log("New Client connected!!");

  socket.on("join", (payload) => {
    console.log("EVENT: join", payload);

    const username = payload.username;
    const gameId = payload.gameId || randomGameId();

    if (!gameRosters[gameId])
      gameRosters[gameId] = new GameRoster(gameId, maxPlayers);
    const roster = gameRosters[gameId];

    if (!roster.isFull() && !roster.playerUsernameExists(username)) {
      socket.on("disconnect", (reason) => {
        console.log(`${username} left the game.`);
        roster.removeFromGameByUsername(username);
      });
      socket.join(payload.gameId);
      const client = new GameClient(socket);
      client.setUsername(username);
      roster.addToGame(client);
      console.log("EMIT: welcome", payload.username);
      const friendNameList = roster.clientList.map((c) => c.profile.username);
      socket.emit("welcome", {
        message: `Welcome to lightening Haiku ${payload.username}`,
        friends: friendNameList,
        maxPlayers,
      });
      sendToAllPlayers(roster, "player-join", {
        friends: friendNameList,
        maxPlayers,
      });
      console.log(`Registered  ${payload.username} in room: ${payload.gameId}`);
      console.log(
        `clientList is now: ${roster.clientList.map((c) => c.profile.username)}`
      );

      if (roster.isFull()) {
        // if(clientList.length === 3){
        //start the game
        handleGame(haikuSocket, roster, gameId);
      }
    } else if (roster.isFull()) {
      console.log("EMIT: join-failed, max reached", payload);
      socket.emit("join-failed", {
        gameId: gameId,
        message: `The game ${gameId} is full.`,
      });
    } else if (roster.playerUsernameExists(username)) {
      console.log("EMIT: join-failed, username taken", payload);
      socket.emit("join-failed", {
        gameId: gameId,
        message: `The the username ${username} is taken.`,
      });
    }
  });
});

const sendToAllPlayers = (roster, event, payload) => {
  for (let client of roster.clientList) {
    console.log("username", client.profile.username);
    console.log("client id", client.io.id);
    console.log(payload);
    client.io.emit(event, payload);
  }
};

const start = (PORT) => {
  server.listen(PORT, () => {
    console.log("listening on", PORT);
  });
};

module.exports = { start };

// socket.emit('join', { clientId: 'Haiku Game 1', clientName: 'Jackson' })
