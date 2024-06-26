const router = require("express").Router();
const passport = require("passport");
const {
    getSafeMap, contributions, postSafeMap, editProfile, deleteUser, uploadAvatar
} = require ("../controllers/profile.controller");

    router.get("/safeMap",[passport.authenticate('jwt', { session: false })], getSafeMap);
    router.get("/contribuciones/:id",[passport.authenticate('jwt', { session: false })], contributions);
    
    
    router.post("/safeMap", [passport.authenticate('jwt', { session: false })], postSafeMap); 
    
    router.put("/tuperfil/:id",[passport.authenticate('jwt', { session: false })], editProfile);
    
    router.delete("/tuperfil/:id", [passport.authenticate('jwt', { session: false })], deleteUser )

    router.post("/tuperfil/avatar", [passport.authenticate("jwt", { session: false })], uploadAvatar);

    





    module.exports = router
 
    