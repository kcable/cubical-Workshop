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

router.post("/create", authAcessJSON, (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  const token = req.cookies["aid"];
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

  let cube = new Cube({
    name,
    description,
    imageUrl,
    difficulty: difficultyLevel,
    creatorId: decoded.userID,
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
