// import yargs from "yargs";
// import cli from "./cli.js";
const yargs = require("yargs");
const cli = require("./cli.js");

yargs.version("0.1.0");
// Create add command
yargs
.command({
    command: "start",
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
      cli.start(argv.server);
    },
  })
  .demandCommand();

yargs.parse();

