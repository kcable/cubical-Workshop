// Id - number
// • Name – string
// • Description – string
// • Image URL – string
// • Difficulty Level– number
const { v4 } = require("uuid");
// uslovieto na zadachata iska da se zapisvat kubovete vuv fail za tova shte polzvam fs modula
const fs = require("fs");
const path = require("path");
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
  save() {
    const CubeData = {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      dificultyLevel: this.dificultyLevel,
    };
    const filePath = path.resolve(__dirname, "../config/database.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const db = JSON.parse(data);
        db.push(CubeData);

        fs.writeFile(filePath, JSON.stringify(db), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              ` ${CubeData.id} is succesfully stored in ${filePath} `
            );
          }
        });
      }
    });
  }
}

module.exports = Cube;
