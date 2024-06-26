// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load the module dependencies
const configureMongoose = require("./config/mongoose");
const configureExpress = require("./config/express");
//
const { graphqlHTTP } = require("express-graphql");
var schema = require("./graphql/schemas/customer.schema.js");
var cors = require("cors");
const jwt = require("jsonwebtoken");

// Define and use the JWT verification middleware
const verifyToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // Debug log

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.name, err.message);
        if (err.name === "TokenExpiredError") {
          // Handle expired token error
          return res.status(401).send("Token expired");
        } else {
          // Handle other errors, such as "JsonWebTokenError" for a malformed token
          return res.status(403).send("Invalid token");
        }
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
};

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Configure CORS options
const corsOptions = {
  origin: ["http://127.0.0.1:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(verifyToken);

// Configure GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP((request, response) => {
    return {
      schema: schema,
      rootValue: global,
      graphiql: true,
      context: {
        req: request,
        res: response,
      },
    };
  })
);
//
// Use the Express application instance to listen to the '4000' port
app.listen(4000, () =>
  console.log(
    "Express GraphQL Server Now Running On http://localhost:4000/graphql"
  )
);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
