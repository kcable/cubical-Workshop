const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//const salt = process.env.SALT;

const genToken = (id, username) => {
  const token = jwt.sign({ userID: id, username }, process.env.PRIVATE_KEY);

  return token;
};

const saveUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    console.error("Passwords don`t match");
    res.status(406).send("Passwords do not match !");
    return false;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPas = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashedPas });

  const userObject = await user.save();

  const token = genToken(userObject._id, userObject.username);

  console.log("token", token);
  res.cookie("aid", token);

  return true;
};

const verifyUser = async (req, res) => {
  const { username, password } = req.body;

  // check if user exists
  const user = await User.findOne({ username });

  const status = await bcrypt.compare(password, user.password);
  if (!status) {
    console.error("no Password match");
    return false;
  }

  const token = genToken(user._id, user.username);
  res.cookie("aid", token);
  return status;
};

const logUserOut = async (req, res) => {};

module.exports = {
  saveUser,
  verifyUser,
  logUserOut,
};
