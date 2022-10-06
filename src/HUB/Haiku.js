'use strict';

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
  toJson(){
    return {
      lines: this.lines,
      linePosition: this.linePosition,
      nextWord: this.nextWord
    }
  }
}
module.exports = Haiku;
