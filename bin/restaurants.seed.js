const Restaurant = require("../models/restaurant.model");
const restaurants = require("./restaurants.json");

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
        await Restaurant.deleteMany();
        console.log("DB cleaned");

        const modelAdaptedRestaurants = restaurants.map(
            ({
                name, 
                neighborhood,
                address, 
                latlng: {lat,long}, 
                image, 
                cuisine_type,
            })=> {
                return {
                    name,
                    neighborhood,
                    address,
                    location: {type: "Point", coordinates: [lat, long]},
                    image,
                    cuisine_type,
                };
            }
        );
        const restaurantsDb = await Restaurant.insertMany(modelAdaptedRestaurants);
        console.log ("Succesful DB Seed with restaurants ${restaurantsDb}!");
    }
    catch (error) {
        console.log("error", error);
    } finally {
        mongoose.connection.close();
    }
})();