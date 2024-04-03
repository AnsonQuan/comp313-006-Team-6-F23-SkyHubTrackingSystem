// Set the 'development' environment configuration object
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  db: process.env.MONGODB_URI,
  sessionSecret: "developmentSessionSecret",
};
