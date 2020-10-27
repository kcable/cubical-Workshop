const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  imageUrl: { type: String, required: true },
  difficulty: { type: Number, required: true, max: 6, min: 1 },
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }],
  creatorId: { type: mongoose.Types.ObjectId, ref: "User" },
});

CubeSchema.path("imageUrl").validate(function (url) {
  return url.startsWith("http://") || url.startsWith("https://");
}, "Not valid image Url");

module.exports = mongoose.model("Cube", CubeSchema);
