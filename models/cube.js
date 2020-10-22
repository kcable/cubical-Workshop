const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  imageUrl: { type: String, required: true },
  difficulty: { type: Number, required: true, max: 6, min: 1 },
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }],
});

module.exports = mongoose.model("Cube", CubeSchema);
