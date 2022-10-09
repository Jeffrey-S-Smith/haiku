class GameClient {

  constructor(io){
    this.io = io
    this.profile = {}
  }

  setUsername(username){
    this.profile.username = username
  }

  toJSON(){
    return {
        io: this.io.id,
        profile
    }
  }

}

class GameRoster {

  constructor(gameId, maxPlayers){
    this.clientList = []
    this.maxPlayers = maxPlayers
    this.gameId = gameId
  }

  playerUsernameExists(username){
    if(-1 !== this.clientList.findIndex(c => c.profile.username === username)){
      return true
    }
    else {
      return false
    }
  }

  addToGame(client) {
    this.clientList.push(client)
  }

  removeFromGameByUsername(username){
    const idx = this.clientList.findIndex(c=>c.profile.username===username)
    this.clientList.splice(idx, 1)
  }

  isFull(){
    if(this.clientList.length >= this.maxPlayers) return true
    else return false
  }

}

module.exports = {
    GameRoster,
    GameClient
}
