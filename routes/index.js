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

router.get("/create", (req, res) => {
  res.render("create", { title: "Cube Workshop|Create" });
});

router.get("/create/accessory", (req, res) => {
  res.render("createAccessory", { title: "Cube Workshop|Create  Accessory" });
});

router.get("/attach/accessory/:id", async (req, res) => {
  const cube = await getCube(req.params.id);
  const accessories = await getAccessories();

  let cubeAcces = cube.accessories.map((acc) => acc.toString());

  let availableAcc = accessories.filter(
    (acc) => !cubeAcces.includes(acc._id.toString())
  );

  res.render("attachAccessory", {
    title: "Cube Workshop|Attach  Accessory",
    ...cube,
    accessories: availableAcc,
    isMaxedOut:
      cube.accessories.length === accessories.length ||
      accessories.length === 0,
  });
});

router.get("/details/:id", async (req, res) => {
  const cube = await getCubeWithAccessories(req.params.id);

  res.render("details", { title: "Cube Workshop|Details", ...cube });
});

router.post("/create/accessory", (req, res) => {
  const { name, description, imageUrl } = req.body;

  let accessory = new Accessory({
    name,
    description,
    imageUrl,
  });

  accessory.save((err) => {
    if (err) {
      console.error(err);
      res.redirect("/create/accessory");
      return;
    } else {
      res.redirect("/");
    }
  });
});

router.post("/clear", (req, res) => {
  flag = false;
  res.redirect("/");
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
      res.redirect("/create");
      return;
    } else {
      res.redirect("/");
    }
  });
});

router.post("/attach/accessory/:id", async (req, res) => {
  const { accessory } = req.body;
  const cubeId = req.params.id;
  await updateCube(cubeId, accessory);

  res.redirect(`/details/${cubeId}`);
});

router.get("*", (req, res) => {
  res.render("404", { title: "Cube Workshop|404" });
});

module.exports = router;
