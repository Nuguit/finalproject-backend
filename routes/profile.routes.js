const router = require("express").Router();
const {
    getSafeMap, postSafeMap, added, contributions
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);
    router.get("/contributions", contributions);
    
    
    router.post("/safeMap", postSafeMap); 
    router.post("/safeMap/:added", added);


    
    





    module.exports = router
 
    