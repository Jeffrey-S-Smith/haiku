const {GameClient, GameRoster} = require("./GameRoster");


describe('GameRoster', () => {
    test('should add Clients and check if username exists', () => {
        const gr = new GameRoster("game 1", 3);
        const io = {};
        const client = new GameClient(io); 
        client.setUsername("John");
        gr.addToGame(client);
        expect(gr.isFull()).toBe(false)
        expect(gr.playerUsernameExists("John")).toBe(true);
        expect(gr.playerUsernameExists("Johnny")).toBe(false);
    });
    
    test('should add Clients and check if game is full ', () => {
        const gr = new GameRoster("game 1", 3);
        const io = {};
        expect(gr.isFull()).toBe(false)
        const client1 = new GameClient(io); 
        client1.setUsername("John");
        gr.addToGame(client1);
        expect(gr.isFull()).toBe(false)
        const client2 = new GameClient(io); 
        client2.setUsername("Johnny");
        gr.addToGame(client2);
        expect(gr.isFull()).toBe(false)
        const client3 = new GameClient(io); 
        client3.setUsername("Jacky");
        gr.addToGame(client3);
        expect(gr.isFull()).toBe(true)
    });
});