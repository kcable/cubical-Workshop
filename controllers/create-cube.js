const Cube = require("../models/cube");

const newCube = new Cube("Test", "this is a test cube", null, 5);

console.log(newCube);

newCube.save();
