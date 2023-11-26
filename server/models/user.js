const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  favorites: {
    type: Array,
    require: true,
    default: [],
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
