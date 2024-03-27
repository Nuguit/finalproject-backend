const router = require("express").Router();
const passport = require("passport");
const {
    getSafeMap, getSafeMapByOwner, postSafeMap, contributions, editProfile
} = require ("../controllers/profile.controller");

    router.get("/safeMap",/*[passport.authenticate('jwt', { session: false })]*/getSafeMap);
    router.get("/contribuciones",[passport.authenticate('jwt', { session: false })], getSafeMapByOwner);
    
    
    router.post("/safeMap", [passport.authenticate('jwt', { session: false })], postSafeMap); 
    
    router.put("/tuperfil/",[passport.authenticate('jwt', { session: false })], editProfile);

    
    





    module.exports = router
 
    