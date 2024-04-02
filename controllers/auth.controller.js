const User = require("../models/user.model");
const { creaPass } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const passportSecret = process.env.PASSPORT_SECRET;

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: true, contenido: "Usuario ya registrado" });
    }
    const passwordCrypt = creaPass(req.body.password);
    const result = await User.create({
      email: req.body.email,
      password: passwordCrypt,
      username: req.body.username,
      avatar: req.body.avatar,

    });
    res.json({ error: false, contenido: result });

  } catch (error) {
    next(error);

  }
};

const login = (req, res) => {
  res.json({
    token: jwt.sign({ user: req.user._id }, passportSecret, { expiresIn: '6d' }),
  });
};

const verify = (req, res) => {

  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};


module.exports = {
  signup,
  login,
  verify
};

