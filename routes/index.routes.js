const router = require("express").Router();
const profileRoutes = require ("./profile.routes");
const authRoutes = require ("./auth.routes");

router.use("/profile", profileRoutes);
router.use("/auth", authRoutes);

module.exports = router;