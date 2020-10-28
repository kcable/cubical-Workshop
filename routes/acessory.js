const express = require("express");

const {
  getCube,
  getAccessories,
  updateCube,
} = require("../controllers/database");

const {
  authAcess,
  userAcess,
  authAcessJSON,
} = require("../controllers/userController");

const Accessory = require("../models/accessory");

const router = express.Router();

router.get("/create/accessory", authAcess, userAcess, (req, res) => {
  res.render("createAccessory", {
    title: "Cube Workshop|Create  Accessory",
    isLoggedIn: req.isLoggedIn,
  });
});

router.get("/attach/accessory/:id", authAcess, userAcess, async (req, res) => {
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
    isLoggedIn: req.isLoggedIn,
  });
});

router.post("/create/accessory", authAcessJSON, async (req, res) => {
  const { name, description, imageUrl } = req.body;

  let accessory = new Accessory({
    name,
    description,
    imageUrl,
  });

  try {
    await accessory.save();
    return res.redirect("/");
  } catch (err) {
    res.render("createAccessory", {
      title: "Cube Workshop|Create  Accessory",
      isLoggedIn: req.isLoggedIn,
      err,
      message: err,
    });
  }
});

router.post("/attach/accessory/:id", authAcessJSON, async (req, res) => {
  const { accessory } = req.body;
  const cubeId = req.params.id;
  await updateCube(cubeId, accessory);

  res.redirect(`/details/${cubeId}`);
});
module.exports = router;
