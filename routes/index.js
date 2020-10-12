// TODO: Require Controllers...

const { Router } = require("express");
const { getCubes, getCube } = require("../controllers/database");

const router = new Router();

router.get("/", (req, res) => {
  getCubes((cubes)=>{
    res.render("index", { title: "Cube Workshop", cubes });
  })
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Cube Workshop|About" });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Cube Workshop|Create" });
});

router.get("/details/:id", (req, res) => {
  getCube(req.params.id,(cube)=>{
    res.render("details", { title: "Cube Workshop|Details" , ...cube });
  })
  
});

router.get("*", (req, res) => {
  res.render("404", { title: "Cube Workshop|404" });
});

module.exports = router;
