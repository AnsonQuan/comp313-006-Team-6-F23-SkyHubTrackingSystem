// models/review.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  overallRating: {
    type: Number,
    required: true,
  },
  userReview: {
    type: String,
    required: true,
  },
  improvements: String,
  recommendation: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  suggestions: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
