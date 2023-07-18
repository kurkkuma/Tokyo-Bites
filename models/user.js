const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
