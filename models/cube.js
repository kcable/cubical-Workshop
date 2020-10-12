// Id - number
// • Name – string
// • Description – string
// • Image URL – string
// • Difficulty Level– number
const { v4 } = require("uuid");
// uslovieto na zadachata iska da se zapisvat kubovete vuv fail za tova shte polzvam fs modula

const { saveCube } = require("../controllers/database");

class Cube {
  constructor(name, description, imageUrl, dificultyLevel) {
    this.id = v4();
    this.name = name || "No Name";
    this.description = description || "No description";
    this.imageUrl =
      imageUrl ||
      "https://images-na.ssl-images-amazon.com/images/I/51GGLwk-bLL._AC_SY355_.jpg";
    this.dificultyLevel = dificultyLevel || 1;
  }

  //todo: SaveCube
  save(callback) {
    const CubeData = {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      dificultyLevel: this.dificultyLevel,
    };
    
    saveCube(CubeData, callback);
    
  }
}

module.exports = Cube;
