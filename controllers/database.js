const mongoose = require("mongoose");
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

async function getCube(id) {
  const cube = await Cube.findById(id).lean();
  return cube;
}

async function getCubes() {
  const cubes = await Cube.find().lean();
  return cubes;
}

async function getAccessories() {
  const accessories = await Accessory.find().lean();
  return accessories;
}

async function updateCube(cubeId, accessoryId) {
  await Cube.findByIdAndUpdate(
    cubeId,
    {
      $addToSet: {
        accessories: accessoryId,
      },
    },
    function (err, raw) {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("Raw response", raw);
      }
    }
  );
}

async function getCubeWithAccessories(id) {
  const cube = await Cube.findById(id).populate("accessories").lean();
  return cube;
}

module.exports = {
  //saveCube,
  getCube,
  getCubes,
  getAccessories,
  updateCube,
  getCubeWithAccessories,
  // getSearch,
};
