const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  searchHistory: {
    type: [String],
    required: false
  }
});

const User = mongoose.model("User", schema);
module.exports = User;
