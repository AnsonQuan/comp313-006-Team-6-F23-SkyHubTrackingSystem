//This file simply loads the correct configuration file
//according to the process.env.NODE_ENV environment variable
//which is set in server.js (it's value is 'development')
// this code will in fact return ./env/development.js
let environment = process.env.NODE_ENV || "development";
module.exports = require("./env/" + environment + ".js");
