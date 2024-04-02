// models/cs.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CSSchema = new Schema({
  title: {
    type: String,
    default: "",
    trim: true,
    required: "Please enter the title",
  },
  content: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CustomerSupport", CSSchema);
