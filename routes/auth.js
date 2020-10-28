const express = require("express");
const User = require("../models/user");
const { saveUser, verifyUser } = require("../controllers/userController");

const {
  authAcess,
  guestAcess,
  userAcess,
} = require("../controllers/userController");
const router = express.Router();

router.get("/login", guestAcess, userAcess, (req, res) => {
  res.render("loginPage", {
    isLoggedIn: req.isLoggedIn,
    err: false,
    message: "",
  });
});

router.get("/register", guestAcess, userAcess, (req, res) => {
  res.render("registerPage", {
    isLoggedIn: req.isLoggedIn,
    err: false,
    message: "",
  });
});

router.post("/register", async (req, res) => {
  const { error, message } = await saveUser(req, res);

  if (error) {
    console.log(message);
    return res.render("registerPage", {
      isLoggedIn: req.isLoggedIn,
      err: error,
      message: message,
    });
  }

  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { err, message } = await verifyUser(req, res);
  if (err) {
    res.render("loginPage", {
      isLoggedIn: req.isLoggedIn,
      err,
      message,
    });
    return;
  }
  res.redirect("/");
});

router.get("/logout", authAcess, (req, res) => {
  res.clearCookie("aid");
  res.redirect("/");
});

module.exports = router;
