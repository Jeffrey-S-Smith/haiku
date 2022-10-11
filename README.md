# Haiku

## Overview

A round-robin Haiku maker. Each player takes turns. The first player supplies the first word of the Haiku Each play, in turn adds one word to the Haiku until the Haiku finishes. You can vote on finished Haikus. Finished haikus can climb up the leaderboard based on votes, and users get points for their Haikus.

## Details

There is server that keeps the state of the game for all the players.

The first step of the game is to join it.

In this stage, the players connect to the server, and give thier names. The server keeps track of how many players have joined. When 3 players have joined, it starts a game.

The next stage is the actual game play. The server needs to keep track of anumber of things:

* The names and sockets of all the players
* The unfinshed haiku as a double array.
* An array of lines and an array of words.
* Whose turn it is.
* If the haiku is finished or not.
* Which line of the haiku we are one.
* Also, it needs to check if the supplied word is valid.
* Each turn, this information is passed to the clients who then can:
* See the last play.
* Participate if it is their turn to play.

## Contributing

Clone the repo

`npm install`

Then you can start the dev server with:

`npm run dev-server`

Clone the frontend repo at [https://github.com/rmccrear/haiku-lightening-frontend](https://github.com/rmccrear/haiku-lightening-frontend) and start the react dev server with:

    git clone https://github.com/rmccrear/haiku-lightening-frontend.git
    
    npm install
    
    npm start

Be sure to set up the environment variables:

For the client you need to run on PORT=3000, and you will need:

    REACT_APP_WS_URL=http://localhost:3002/haiku

For the server, you will need 

    PORT=3002
    APP_URL=http://localhost:3000

This is for the CORS to work properly.

## Whiteboard Process

For this project, we used exxcallidraw and Remo to plan out our project, as well as talking to Jacob and walking through our thought process for approval from him .

![UMl](/images/UML.png)
