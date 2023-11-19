const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
});

router.post("/add-review", async (req, res) => {
  const { userName, date, stars, text } = req.body;
  try {
    const newReview = new Review({ userName, date, stars, text });
    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

module.exports = router;
