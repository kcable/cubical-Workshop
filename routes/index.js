// TODO: Require Controllers...

const { Router } = require("express");
const {
  getCubes,
  getCube,
  getAccessories,
  updateCube,
  getCubeWithAccessories,
} = require("../controllers/database");
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");
let flag = false;
let results;
const router = new Router();

router.get("/", async (req, res) => {
  const cubes = await getCubes();
  res.render("index", { title: "Cube Workshop", cubes });
});

// router.post("/", (req, res) => {           IMPLEMENT LATER OK /?
//   const { search, from, to } = req.body;
//   flag = true;
//   // console.log(req.body);
//   getSearch(
//     (cubes) => {
//       results = cubes;
//       res.redirect("/");
//     },
//     search,
//     to,
//     from
//   );
// });

router.get("/about", (req, res) => {
  res.render("about", { title: "Cube Workshop|About" });
});

router.post("/clear", (req, res) => {
  flag = false;
  res.redirect("/");
});

router.get("*", (req, res) => {
  res.render("404", { title: "Cube Workshop|404" });
});

module.exports = router;
