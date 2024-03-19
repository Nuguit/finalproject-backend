const router = require("express").Router();
const {
    getSafeMap, added, contributions
} = require ("../controllers/profile.controller");

    router.get("/safeMap", getSafeMap);

    router.post("/safeMap", getSafeMap); // <--ESTA SERÍA ASÍ? PORQUE ES UNA
    //WEB QUE DA INFO Y EN LA QUE SE MANDA INFO A TRAVÉS DEL FORM :S
    
    
    router.post("/safeMap/:added", added);


    
    router.get("/contributions", contributions);





    module.exports = router
 
    