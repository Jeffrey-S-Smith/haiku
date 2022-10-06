const inquirer = require("inquirer");
const axios = require("axios");

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

// a structure for a haiku in progress
class Haiku {
  constructor(lines, linePosition, nextWord) {
    this.lines = lines || [[], [], []];
    this.linePosition = linePosition || 0; // which line are we currently working on?
    this.nextWord = "" || nextWord; // to send to server
  }
  tryWord(word) {
    // hold off on adding word to the haiku until it is checked.
    this.nextWord = word;
    return true;
  }
  acceptWord() {
    // we can check and accept it here.
    this.lines[this.linePosition].push(this.nextWord);
  }
  displayAsText() {
    const lines = this.lines.map((line) => line.join(" "));
    return lines.join("\n");
  }
}

const start = async (server) => {
  const { username } = await promptForUsername();
  const theHaiku = new Haiku();
  console.log(`Welcome to Haiku lightening, ${username}!`);
  console.log(`Please wait while we assign you to a team.`);
  let finished = false;
  while (!finished) {
    const { nextWord } = await promptForWord(username, theHaiku.lines);
    if (nextWord === "end") break;
    if (nextWord === "endline") {
      theHaiku.linePosition++;
      continue;
    }
    theHaiku.tryWord(nextWord);
    theHaiku.acceptWord();
  }
  console.log(`congratulations, ${username}, you have finished the Haiku!`);
  console.log(theHaiku.displayAsText());
};

const cli = { start };

module.exports = cli;
