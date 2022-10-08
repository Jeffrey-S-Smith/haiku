const io = require("socket.io-client");

class Player {
  constructor() {
    this.io = io.of("/haiku");
  }
  setUsernameAndJoin(gameId, username) {
    const payload = {
      gameId,
      username,
    };
    this.io.emit("join", payload);
  }
}
