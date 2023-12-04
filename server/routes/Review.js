const express = require("express");
const router = express.Router();
const Review = require("../models/review");

const MAX_REVIEWS_PER_USER = 5;

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
});

router.post("/add-review", async (req, res) => {
  const { userId, userName, date, stars, text } = req.body;
  try {
    const usersReviewsCount = await Review.countDocuments({ userId });

    if (usersReviewsCount < MAX_REVIEWS_PER_USER) {
      const newReview = new Review({ userId, userName, date, stars, text });
      await newReview.save();

      res.status(200).json(newReview);
    } else {
      res.status(403).json({
        error: `You can't add more than ${MAX_REVIEWS_PER_USER} reviews.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

router.delete("/delete-review", async (req, res) => {
  const { reviewId } = req.body;
  try {
    const deletedReview = await Review.findByIdAndRemove(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
