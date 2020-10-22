// TODO: Require Controllers...

const { Router } = require("express");
const { getCubes, getCube, getSearch } = require("../controllers/database");
const Cube = require("../models/cube");
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

router.post("/clear", (req, res) => {
  flag = false;
  res.redirect("/");
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Cube Workshop|About" });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Cube Workshop|Create" });
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  let cube = new Cube({
    name,
    description,
    imageUrl,
    difficulty: difficultyLevel,
  });

  cube.save((err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/details/:id", async (req, res) => {
  const cube = await getCube(req.params.id);

  res.render("details", { title: "Cube Workshop|Details", ...cube });
});

router.get("*", (req, res) => {
  res.render("404", { title: "Cube Workshop|404" });
});

module.exports = router;
