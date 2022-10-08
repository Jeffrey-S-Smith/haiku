/*
import inquirer from "inquirer";
import axios from "axios";
import chalk from "chalk";
import Haiku from "./Haiku";
*/
const inquirer = require("inquirer");
const io = require("socket.io-client");
const chalk = require("chalk");
const Haiku = require("../lib/Haiku");
const { v4: uuid } = require("uuid");

const q = (type, name, message) => {
  return { type, name, message };
};

const promptForUsername = async () => {
  const question = q("input", "username", "What is your name?");
  const askForName = await inquirer.prompt(question);
  return askForName;
};

const haikuToText = (haiku) => {
  const lines = haiku.map((line) => line.join(" "));
  return lines.join("\n");
};

const promptForWord = async (username, haikuLines) => {
  const prompt = `It is your turn, ${username}.
A haiku must have 5-7-5 syllables in its lines.
The current haiku is: 
${haikuToText(haikuLines)}
Choose the next word to put into the Haiku: `;
  const question = q("input", "nextWord", prompt);
  const askForNextWord = await inquirer.prompt(question);
  return askForNextWord;
};

const startSinglePlayer = async (server) => {
  const { username } = await promptForUsername();
  const theHaiku = new Haiku();
  console.log(chalk.blue(`Welcome to Haiku lightening, ${username}!`));
  console.log(`Please wait while we assign you to a team.`);
  while (!theHaiku.finished) {
    const { nextWord } = await promptForWord(username, theHaiku.lines);
    //     if (nextWord === "end") break;
    //     if (nextWord === "endline") {
    //       theHaiku.linePosition++;
    //       continue;
    //     }
    const tryIsOk = theHaiku.tryWord(nextWord);
    if (tryIsOk) {
      theHaiku.acceptWord();
    } else {
      console.log(chalk.red(`The computer says "${nextWord}" cannot be used.`));
    }
  }
  console.log(
    chalk.green(`congratulations, ${username}, you have finished the Haiku!`)
  );
  console.log(theHaiku.displayAsText());
};

const Player = require("../lib/Player");
const { object } = require("syllable-checker/dictionary/en/dict");

const joinConfirmed = (data, player) => {
  GAME_STATE.joined = true;
};

const GAME_STATE = {
  joined: false,
};

const startMultiPlayer = async (server, gameName) => {
  const gameId = gameName || uuid();
  const gameIo = io("http://localhost:3002/haiku"); // server
  const player = new Player(gameIo);
  player.onJoinGame(joinConfirmed);
  const { username } = await promptForUsername();
  player.setUsernameAndJoin(gameId, username);
  console.log(chalk.blue(`Welcome to Haiku lightening, ${username}!`));
  console.log(
    chalk.blue(`Please wait while we assign you to a team on game: ${gameId}.`)
  );
  await pollForEvent(GAME_STATE, (state) => state.joined === true);
  console.log(chalk.red(`You have joined the game.`));

  const theHaiku = new Haiku();

  while (!theHaiku.finished) {
    const { nextWord } = await promptForWord(username, theHaiku.lines);
    //     if (nextWord === "end") break;
    //     if (nextWord === "endline") {
    //       theHaiku.linePosition++;
    //       continue;
    //     }
    const tryIsOk = theHaiku.tryWord(nextWord);
    if (tryIsOk) {
      theHaiku.acceptWord();
    } else {
      console.log(chalk.red(`The computer says "${nextWord}" cannot be used.`));
    }
  }
  console.log(
    chalk.green(`congratulations, ${username}, you have finished the Haiku!`)
  );
  console.log(theHaiku.displayAsText());
};

const pollForEvent = (obj, fn) => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (fn(obj)) {
        clearInterval(intervalId);
        resolve();
      }
    }, 300);
  });
};

const cli = { startSinglePlayer, startMultiPlayer };

module.exports = cli;
// export default cli;
