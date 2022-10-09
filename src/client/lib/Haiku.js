// import { syllable } from "syllable";
const syllable = require("syllable");

class Haiku {
  constructor(haiku) {
    haiku = haiku || {};
    const { lines, linePosition, nextWord, finished } = haiku;
    this.lines = lines || [[], [], []];
    this.linePosition = linePosition || 0; // which line are we currently working on?
    this.nextWord = "" || nextWord; // to send to server
    this.finished = false || finished;
  }
  tryWord(word) {
    // hold off on adding word to the haiku until it is checked.
    const syllablesToGo = unfinishedHaikuChecker(
      this.lines,
      this.linePosition,
      word
    );
    if (syllablesToGo >= 0) {
      this.nextWord = word;
      return true;
    } else {
      return false;
    }
  }
  acceptWord() {
    // we can check and accept it here.
    const syllablesToGo = unfinishedHaikuChecker(
      this.lines,
      this.linePosition,
      this.nextWord
    );
    if (syllablesToGo > 0) {
      this.lines[this.linePosition].push(this.nextWord);
      return true;
    } else if (syllablesToGo === 0) {
      this.lines[this.linePosition].push(this.nextWord);
      if (this.linePosition === 2) this.finished = true;
      else this.linePosition++;
      return true;
    } else {
      return false;
    }
  }
  displayAsText() {
    const lines = this.lines.map((line) => line.join(" "));
    return lines.join("\n");
  }
  toJSON(){
    const lines = this.lines || [[], [], []];
    const linePosition = this.linePosition || 0; // which line are we currently working on?
    const nextWord = this.nextWord || ""; // to send to server
    const finished = this.finished || false;
    return {
      lines,
      linePosition,
      nextWord,
      finished
    }
  }
}

// check if the next word fits
// return 0 if just fits
// return + if too many
// return - if fits
function unfinishedHaikuChecker(arr, linePosition, nextWord) {
  const line = arr[linePosition];
  const newLine = line.concat([nextWord]);
  const sylCount = syllable(newLine);
  if (linePosition === 0 || linePosition === 2) {
    return 5 - sylCount;
  } else if (linePosition === 1) {
    return 7 - sylCount;
  }
}

module.exports = Haiku;
// export default Haiku;
