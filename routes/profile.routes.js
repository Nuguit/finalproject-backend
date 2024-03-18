const router = require("express").Router();
const {
    getSafeMap, postSafeMap, added, contributions
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);
    
    
    router.post("/safeMap/:added", added);


    
    router.get("/contributions", contributions);





    module.exports = router
 
    