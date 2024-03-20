const router = require("express").Router();
const {
    getSafeMap, added, contributions
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);
    router.get("/contributions", contributions);
    
    
    router.post("/safeMap", getSafeMap); 
      
    router.post("/safeMap/:added", added);


    
    





    module.exports = router
 
    