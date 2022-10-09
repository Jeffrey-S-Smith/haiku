class Player {
  constructor(io) {
    this.io = io;
  }
  setUsernameAndJoin(gameId, username) {
    const payload = {
      gameId,
      username,
    };
    this.username = username;
    this.gameId = gameId;
    this.io.emit("join", payload);
  }
  onJoinGame(fn) {
    const player = this;
    this.io.on("welcome", (data) => {
      fn(data, player);
    });
  }
  onGameStart(fn) {
    this.io.on("game-starting", (data) => {
      console.log("Player: game-starting");
      fn(data, player);
    });
  }
  onGameMove(fn) {
    this.io.on("game", (data) => {
      console.log("Player: game");
      fn(data, player);
    });
  }
  takeTurn(word) {
    this.io.emit("turn", { word });
  }
}

module.exports = Player;
