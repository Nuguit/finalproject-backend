const express = require("express");
const router = express.Router();
const passport = require ("passport");
const { login, signup } = require ("../controllers/auth.controller");

router.all ("/fail", (req, res) => {
    res.status(401).json ({ message: "Unauthorized"});
});

router.post ("/login", passport.authenticate ("login", {session: false, failureRedirect: "/"}), login);
router.post ("/signup", signup);

module.exports = router;