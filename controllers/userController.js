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

  if (
    password !== repeatPassword ||
    !password ||
    password.length < 8 ||
    !password.match(/^[A-Za-z0-9]{8,20}$/)
  ) {
    return {
      error: true,
      message: "Passwords do not match or is below 8 chars  !",
    };
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPas = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPas });

    const userObject = await user.save();

    const token = genToken(userObject._id, userObject.username);

    res.cookie("aid", token);

    return token;
  } catch (err) {
    return { error: true, message: err };
  }
};

const verifyUser = async (req, res) => {
  const { username, password } = req.body;

  // check if user exists
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { err: true, message: "No such user" };
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return { err: true, message: "No password Match" };
    }

    const token = genToken(user._id, user.username);
    res.cookie("aid", token);
    return status;
  } catch (err) {
    return { err: true, message: "Unexpected error" };
  }
};

const authAcess = (req, res, next) => {
  const token = req.cookies["aid"];
  if (!token) {
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    next();
  } catch (e) {
    console.error(e);
    res.redirect("/");
  }
};

const guestAcess = (req, res, next) => {
  const token = req.cookies["aid"];
  if (token) {
    return res.redirect("/");
  }
  next();
};

const userAcess = (req, res, next) => {
  const token = req.cookies["aid"];
  if (!token) {
    req.isLoggedIn = false;
  }

  try {
    jwt.verify(token, process.env.PRIVATE_KEY);
    req.isLoggedIn = true;
  } catch (err) {
    req.isLoggedIn = false;
  }

  next();
};

const authAcessJSON = (req, res, next) => {
  const token = req.cookies["aid"];
  if (!token) {
    return res.json({
      error: "Not authenticated",
    });
  }
  try {
    jwt.verify(token, process.env.PRIVATE_KEY);
    next();
  } catch (err) {
    res.json({
      error: "Not authenticated",
    });
  }
};

module.exports = {
  authAcess,
  saveUser,
  verifyUser,
  guestAcess,
  userAcess,
  authAcessJSON,
};
