function checkValidWord(word) {
  if (/ /.test(word)) {
    return {
      word,
      valid: false,
      message: "word cannot contain a space.",
    };
  } else {
    return {
      word,
      valid: true,
    };
  }
}

module.exports = checkValidWord;
