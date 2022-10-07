// import yargs from "yargs";
// import cli from "./cli.js";
const yargs = require("yargs");
const cli = require("./cli.js");

yargs.version("0.1.0");
// Create add command
yargs
  .command({
    command: "multi-player",
    describe: "Start a game on the server",
    builder: {
      server: {
        describe: "Server address e.g. https://...",
        alias: "s",
        demandOption: true, // Required
        type: "string",
      },
    },

    // Function for your command
    handler(argv) {
      cli.startMultiPlayer(argv.server);
    },
  })
  .command({
    command: "single-player",
    describe: "Start single player game",
    // Function for your command
    handler(argv) {
      console.log("handler");
      cli.startSinglePlayer();
    },
  })
  .demandCommand();

yargs.parse();

