const Cube = require("../models/cube");

const newCube1 = new Cube(
  "Test2",
  "this is a test cube2",
  "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
  7
);
const newCube2 = new Cube(
  "Test3",
  "this is a test cube3",
  "https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg",
  4
);
const newCube3 = new Cube(
  "Test4",
  "this is a test cube4",
  "https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg",
  5
);

//newCube1.save();
//newCube2.save();
newCube3.save();
