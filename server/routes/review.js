// 1. import libraries
const express = require("express");
const Review = require("../models/review");

const router = express.Router();

// 2. create routes
router

  // CREATE REVIEW
  .post("/create", async (req, res) => {
    try {
      const review = await Review.createReview(
        req.body.reviewText,
        req.body.rating,
        req.body.userId,
        req.body.bookId
      );

      res.send(review);
    } catch (error) {
      res.status(401).send({
        message: error.message
      });
    }
  })

  // READ REVIEW
  .get("/:id", async (req, res) => {
    try {
      const review = await Review.getReview(
        req.params.id
      );

      res.send(review);
    } catch (error) {
      res.status(401).send({
        message: error.message
      });
    }
  })

  // UPDATE REVIEW RATING
  .put("/update", async (req, res) => {
    try {
      const review =
        await Review.updateReviewRating(
          req.body.id,
          req.body.rating
        );

      res.send(review);
    } catch (error) {
      res.status(401).send({
        message: error.message
      });
    }
  })

  // DELETE REVIEW
  .delete("/delete", async (req, res) => {
    try {
      await Review.deleteReview(
        req.body.id
      );

      res.send({
        success: "Review deleted"
      });
    } catch (error) {
      res.status(401).send({
        message: error.message
      });
    }
  });

// 3. export router
module.exports = router;