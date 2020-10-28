const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [
      /^[A-Za-z0-9]{5,}$/,
      "Name must contain numbers and letters only and be at least 5 chars long",
    ],
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    match: [
      /^[A-Za-z0-9 !@]{20,2000}$/,
      "Description must be between 20 and 2000 chars",
    ],
  },
  imageUrl: { type: String, required: true },
  difficulty: { type: Number, required: true, max: 6, min: 1 },
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }],
  creatorId: { type: mongoose.Types.ObjectId, ref: "User" },
});

CubeSchema.path("imageUrl").validate(function (url) {
  return url.startsWith("http://") || url.startsWith("https://");
}, "Not valid image Url");

module.exports = mongoose.model("Cube", CubeSchema);
