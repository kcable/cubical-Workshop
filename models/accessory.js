const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [
      /^[A-Za-z0-9 ]{5,100}$/,
      "Name must be at least 5 chars only numbers and latin letters",
    ],
  },
  imageUrl: { type: String, required: true }, // do validation
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    match: [
      /^[A-Za-z0-9 !@]{20,2000}$/,
      "Description must be between 20 and 2000 chars",
    ],
  },
  cubes: [{ type: mongoose.Types.ObjectId, ref: "Cube" }],
});

AccessorySchema.path("imageUrl").validate(function (url) {
  return url.startsWith("http://") || url.startsWith("https://");
}, "Image url is not valid");

module.exports = mongoose.model("Accessory", AccessorySchema);
