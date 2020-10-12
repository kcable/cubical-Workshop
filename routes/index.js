// TODO: Require Controllers...

const { Router } = require("express");
const { getCubes, getCube , getSearch } = require("../controllers/database");
const  Cube  = require( "../models/cube");
let flag = false;
let results;
const router = new Router();

router.get("/", (req, res) => {
  if(!flag){
    getCubes((cubes)=>{
      res.render("index", { title: "Cube Workshop", cubes });
    })
  } else{
     const cubes = results;
      res.render("index", { title: "Cube Workshop", cubes });
    }
  
});


router.post("/", (req, res) => {
  const {
    search,
    from,
    to
    } = req.body
  flag = true;
 // console.log(req.body);
  getSearch((cubes)=>{
    results = cubes;
    res.redirect("/");
  },search,to,from)

 
});

router.post("/clear",(req,res)=>{
  flag = false;
  res.redirect("/");
})

router.get("/about", (req, res) => {
  res.render("about", { title: "Cube Workshop|About" });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Cube Workshop|Create" });
});

router.post("/create", (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
  } = req.body
  
  let cube = new Cube(name,description,imageUrl,difficultyLevel);
  
  cube.save(()=> {
    res.redirect("/");
  });
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
