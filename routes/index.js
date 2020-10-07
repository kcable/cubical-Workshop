// TODO: Require Controllers...

const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Cube Workshop" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Cube Workshop|About" });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Cube Workshop|Create" });
});

router.get("/details:id", (req, res) => {
  res.render("details", { title: "Cube Workshop|Details" });
});

router.get("*", (req, res) => {
  res.render("404", { title: "Cube Workshop|404" });
});

module.exports = router;
