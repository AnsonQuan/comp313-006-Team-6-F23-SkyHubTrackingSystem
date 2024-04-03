require('dotenv').config(); // Move dotenv config to the top

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load the module dependencies
const configureMongoose = require("./config/mongoose");
const configureExpress = require("./config/express");
const { graphqlHTTP } = require("express-graphql");
var schema = require("./graphql/schemas/customer.schema.js");
var cors = require("cors");

// CORS Options, adjust according to your needs
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', // Dynamic origin based on environment variable
  credentials: true,
  optionsSuccessStatus: 200
};

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

//configure GraphQL to use over HTTP
app.use("*", cors(corsOptions));
app.use(
  "/graphql",
  cors(corsOptions),
  graphqlHTTP((req, res) => ({
    schema: schema,
    rootValue: global,
    graphiql: true,
    context: {req, res}, 
  }))
);
// Dynamic port configuration
const PORT = process.env.PORT || 4000;

// Use the Express application instance to listen to the PORT
app.listen(PORT, () =>
  console.log(`Express GraphQL Server Now Running On http://localhost:${PORT}/graphql`)
);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
