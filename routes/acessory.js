const express = require("express");

const {
  getCubes,
  getCube,
  getAccessories,
  updateCube,
  getCubeWithAccessories,
} = require("../controllers/database");
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

const router = express.Router();

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

router.post("/attach/accessory/:id", async (req, res) => {
  const { accessory } = req.body;
  const cubeId = req.params.id;
  await updateCube(cubeId, accessory);

  res.redirect(`/details/${cubeId}`);
});
module.exports = router;
