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
const router = new express.Router();

router.get("/edit/:id", (req, res) => {
  res.render("editCubePage");
});

router.get("/delete/:id", (req, res) => {
  res.render("deleteCubePage");
});

router.get("/details/:id", async (req, res) => {
  const cube = await getCubeWithAccessories(req.params.id);

  res.render("details", { title: "Cube Workshop|Details", ...cube });
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
      res.redirect("/create");
      return;
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;