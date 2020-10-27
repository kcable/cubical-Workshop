// TODO: Require Controllers...

const { Router } = require("express");
const { getCubes } = require("../controllers/database");
const { userAcess, authAcessJSON } = require("../controllers/userController");
const router = new Router();

router.get("/", userAcess, async (req, res) => {
  const cubes = await getCubes();
  res.render("index", {
    title: "Cube Workshop",
    cubes,
    isLoggedIn: req.isLoggedIn,
  });
});

// router.post("/", (req, res) => {           IMPLEMENT LATER OK /?
//   const { search, from, to } = req.body;
//   flag = true;
//   // console.log(req.body);
//   getSearch(
//     (cubes) => {
//       results = cubes;
//       res.redirect("/");
//     },
//     search,
//     to,
//     from
//   );
// });

router.get("/about", userAcess, (req, res) => {
  res.render("about", {
    title: "Cube Workshop|About",
    isLoggedIn: req.isLoggedIn,
  });
});

router.post("/clear", (req, res) => {
  flag = false;
  res.redirect("/");
});

router.get("*", userAcess, (req, res) => {
  res.render("404", { title: "Cube Workshop|404", isLoggedIn: req.isLoggedIn });
});

module.exports = router;
