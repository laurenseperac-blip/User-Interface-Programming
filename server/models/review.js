// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  // Foreign Key -> User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Foreign Key -> Book
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  }
});

// 3. create model of schema
const Review = mongoose.model("Review", reviewSchema);

// 4. CRUD functions

// CREATE
async function createReview(
  reviewText,
  rating,
  userId,
  bookId
) {
  const review = await Review.create({
    reviewText,
    rating,
    userId,
    bookId
  });

  return review._doc;
}

// READ
async function getReview(id) {
  return await Review.findById(id);
}

// UPDATE (rating only)
async function updateReviewRating(id, rating) {
  const review = await Review.findByIdAndUpdate(
    id,
    { rating },
    { new: true }
  );

  return review._doc;
}

// DELETE
async function deleteReview(id) {
  await Review.deleteOne({ _id: id });
}

// 5. export functions
module.exports = {
  createReview,
  getReview,
  updateReviewRating,
  deleteReview
};