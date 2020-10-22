const mongoose = require("mongoose");
const Cube = require("../models/cube");

async function getCube(id) {
  const cube = await Cube.findById(id).lean();
  return cube;
}

async function getCubes() {
  const cubes = await Cube.find().lean();
  return cubes;
}

module.exports = {
  saveCube,
  getCube,
  getCubes,
  getSearch,
};
