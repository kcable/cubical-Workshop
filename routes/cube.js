const express = require("express");
const jwt = require("jsonwebtoken");
const { getCubeWithAccessories } = require("../controllers/database");
const Cube = require("../models/cube");

const router = new express.Router();
const {
  authAcess,
  userAcess,
  authAcessJSON,
} = require("../controllers/userController");

router.get("/edit/:id", authAcess, userAcess, (req, res) => {
  res.render("editCubePage", { isLoggedIn: req.isLoggedIn });
});

router.get("/delete/:id", authAcess, userAcess, (req, res) => {
  res.render("deleteCubePage", { isLoggedIn: req.isLoggedIn });
});

router.get("/details/:id", userAcess, async (req, res) => {
  const cube = await getCubeWithAccessories(req.params.id);

  res.render("details", {
    title: "Cube Workshop|Details",
    ...cube,
    isLoggedIn: req.isLoggedIn,
  });
});

router.get("/create", authAcess, userAcess, (req, res) => {
  res.render("create", {
    title: "Cube Workshop|Create",
    isLoggedIn: req.isLoggedIn,
  });
});

router.post("/create", authAcessJSON, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  const token = req.cookies["aid"];
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

  let cube = new Cube({
    name: name.trim(),
    description,
    imageUrl,
    difficulty: difficultyLevel,
    creatorId: decoded.userID,
  });
  try {
    await cube.save();
    return res.redirect("/");
  } catch (err) {
    res.render("create", {
      title: "Cube Workshop|Create",
      isLoggedIn: req.isLoggedIn,
      err,
      message: err,
    });
  }
});
module.exports = router;
