const io = require("socket.io-client");

class Player {
  constructor() {
    this.io = io("http://localhost:3002/haiku");
  }
  setUsernameAndJoin(gameId, username) {
    const payload = {
      gameId,
      username,
    };
    this.io.emit("join", payload);
  }
}

module.exports = Player;
