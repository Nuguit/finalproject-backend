const router = require("express").Router();
const {
    getSafeMap, postSafeMap, contributions, editProfile
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);
    router.get("/contributions", contributions);
    
    
    router.post("/safeMap", postSafeMap); 
    
    router.put("/tuperfil/:edit_id", editProfile);

    
    





    module.exports = router
 
    