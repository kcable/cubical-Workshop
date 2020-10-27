const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  //TODO: Setup the view engine
  app.use(cookieParser());
  app.engine(
    ".hbs",
    handlebars({
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");
  app.use(express.urlencoded({ extended: true }));

  //TODO: Setup the body parser

  //TODO: Setup the static files
  app.use("/static", express.static("static"));
};
