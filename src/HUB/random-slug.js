const { generateSlug } = require("random-word-slugs")

const options = {
    format: "kebab",
    partsOfSpeech: ["adjective", "noun"],
    categories: {
      adjective: ["color", "appearance"],
      noun: ["animals"],
    },
  };

function randomGameId(){
    return generateSlug(options)
}

module.exports = randomGameId;