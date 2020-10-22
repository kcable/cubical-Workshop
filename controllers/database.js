const mongoose = require("mongoose");
const Cube = require("../models/cube");

function saveCube(CubeData, callback) {
  getCubes((db) => {
    db.push(CubeData);
    fs.writeFile(filePath, JSON.stringify(db), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(` ${CubeData.id} is succesfully stored in ${filePath} `);
        callback();
      }
    });
  });
}

async function getCube(id) {
  const cube = await Cube.findById(id).lean();
  return cube;
}

async function getCubes() {
  const cubes = await Cube.find().lean();
  return cubes;
}

function getSearch(callback, search, to, from) {
  to = to.length === 0 ? 7 : Number(to);
  from = from.length === 0 ? 1 : Number(from);

  getCubes((cubes) => {
    let matches = [];

    cubes.forEach((element) => {
      if (
        element.name === search ||
        (element.dificultyLevel >= from && element.dificultyLevel <= to)
      ) {
        matches.push(element);
      }
    });

    callback(matches);
  });
}

module.exports = {
  saveCube,
  getCube,
  getCubes,
  getSearch,
};
