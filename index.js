require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const mongoose = require("mongoose");
const config = require("./config/config")[env];
const express = require("express");
const indexRoute = require("./routes/index");
const authRoutes = require("./routes/auth");
const cubeRoutes = require("./routes/cube");
const acessRoutes = require("./routes/acessory");
const app = express();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@gettingstarted.lywkb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  async function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Database connection established");
  }
);

require("./config/express")(app);

app.use("/", authRoutes);
app.use("/", acessRoutes);
app.use("/", cubeRoutes);
app.use("/", indexRoute);

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);
