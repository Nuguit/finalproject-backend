const safemap = require("../models/profile.model");
const warnings = require("./warnings.json"); //<--?????

(async ()=> {
    const mongoose = require ("mongoose");

const MONGO_URI = 
process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/finalproject";

mongoose
.connect(MONGO_URI)
.then ((x) => {
    const dbName = x.connections[0].name;
    console.log ("Connected to Mongo! Database name: '${dbName}'");})
    .catch ((err)=>{
        console.error("Error connecting to Mongo: ", err);
    });

    try {
        await safemap.deleteMany();
        console.log("DB cleaned");

        const modelSafeMap = warnings.map(
            ({
                input    // <-- lOCATION???
            })=> {
                return {
                    input, //<-- LOCATION OTRA VEZ???
                };
            }
        );
        const warningDB = await safemap.insertMany(modelSafeMap);
        console.log ("Succesful DB Seed with warnings ${warningDB}!");
    }
    catch (error) {
        console.log("error", error);
    } finally {
        mongoose.connection.close();
    }
})();