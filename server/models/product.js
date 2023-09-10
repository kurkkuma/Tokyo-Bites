const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  composition: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  kcal: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  proteins: {
    type: Number,
    require: true,
  },
  fats: {
    type: Number,
    require: true,
  },
  carbohydrates: {
    type: Number,
    require: true,
  },
  tags: {
    type: Array,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
