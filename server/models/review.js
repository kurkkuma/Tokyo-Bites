const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  stars: {
    type: Number,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: false,
  },
});

const Review = mongoose.model("Review", reviewSchema, "reviews");

module.exports = Review;
