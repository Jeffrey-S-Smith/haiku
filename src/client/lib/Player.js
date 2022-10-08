class Player {
  constructor(io) {
    this.io = io;
  }
  setUsernameAndJoin(gameId, username) {
    const payload = {
      gameId,
      username,
    };
    this.io.emit("join", payload);
  }
  onJoinGame(fn) {
    const player = this;
    this.io.on("welcome", (data) => {
      fn(data, player);
    });
  }
  onGameStart(fn) {
    this.io.on("game-start", fn);
  }
  onTurn(fn) {
    this.io.on("turn", fn);
  }
  takeTurn(word) {
    this.io.emit("turn", { word });
  }
}

module.exports = Player;
