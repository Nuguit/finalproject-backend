const router = require("express").Router();
const {
    getSafeMap, postSafeMap, contributions
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);
    router.get("/contributions", contributions);
    
    
    router.post("/safeMap", postSafeMap); 
    


    
    





    module.exports = router
 
    