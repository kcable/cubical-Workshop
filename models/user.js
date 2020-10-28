const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    match: [
      /^[A-Za-z0-9]{5,20}$/,
      "User must contain english chareacters and numbers only and be at least 5 symbols",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
