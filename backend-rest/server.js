// Load the module dependencies
const mongoose = require("mongoose");
const express = require("./config/express");

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// MongoDB URI
const mongodbURI = "YOUR_MONGODB_URI";

// Create a new Mongoose connection instance
mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    // Create a new Express application instance
    const app = express();

    // Define the port to listen on
    const port = process.env.PORT || 5000;

    // Use the Express application instance to listen on the defined port
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
