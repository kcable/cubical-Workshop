const express = require("express");
const User = require("../models/user");
const {
  saveUser,
  verifyUser,
  logUserOut,
} = require("../controllers/userController");

const {
  authAcess,
  guestAcess,
  userAcess,
  authAcessJSON,
} = require("../controllers/userController");
const router = express.Router();

router.get("/login", guestAcess, userAcess, (req, res) => {
  res.render("loginPage", {
    isLoggedIn: req.isLoggedIn,
  });
});

router.get("/register", guestAcess, userAcess, (req, res) => {
  res.render("registerPage", {
    isLoggedIn: req.isLoggedIn,
  });
});

router.post("/register", async (req, res) => {
  const status = await saveUser(req, res);

  if (status) {
    res.redirect("/");
  } else {
    console.error("Can`t create");
  }
});

router.post("/login", async (req, res) => {
  await verifyUser(req, res);
  res.redirect("/");
});

router.get("/logout", authAcess, async (req, res) => {
  await logUserOut(req, res);
  res.redirect("/");
});

module.exports = router;
