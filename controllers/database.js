const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../config/database.json");

function saveCube(CubeData,callback){
    getCubes((db)=>{
        db.push(CubeData);
        fs.writeFile(filePath, JSON.stringify(db), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(
                ` ${CubeData.id} is succesfully stored in ${filePath} `
              );
              callback();
            }
          });
   });
    
}

function getCube(id,callback){
   getCubes((cubes)=>{
        const match = cubes.filter(c => c.id === id);
        callback(match[0]);
   })
}

function getCubes(callback){
    fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const db = JSON.parse(data);
          callback(db);
        }
      });
}


module.exports = { 
    saveCube,
    getCube,
    getCubes
}