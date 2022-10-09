const dotenv = require('dotenv')
if (process.env && process.env.NODE_ENV==="development"){
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  console.log(process.env);
}
const PORT = process.env.PORT || 3002;;

const {start} = require("./src/HUB/server")

start(PORT);