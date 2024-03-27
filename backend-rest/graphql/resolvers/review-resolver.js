// Customer Reviews Resolver

const review = require("../models/review");

//Adds a review
const addReview = async (root, params) => {
  const reviewModel = new review(params);
  const newReview = await reviewModel.save();
  if (!newReview) {
    throw new Error("Error");
  }
  return newReview;
};

//Retrieves all reviews from database
const getReviews = async () => {
  const reviews = await review.find().exec();
  if (!reviews) {
    throw new Error("Error");
  }
  return reviews;
};

const getReviewById = async (root, params) => {
  const reviewFound = await review.findById(params.id).exec();
  if (!reviewFound) {
    throw new Error("Error");
  }
  return reviewFound;
};

const updateReview = async (root, params) => {
  const updatedReview = await review
    .findByIdAndUpdate(params.id, params)
    .exec();
  if (!updatedReview) {
    throw new Error("Error");
  }
  return updatedReview;
};

module.exports = {
  addReview,
  getReviews,
  getReviewById,
  updateReview,
};
