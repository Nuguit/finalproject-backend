const mongoose = require("mongoose");

const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/safemap"

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to Mongo! ");
    })
    .catch((err) => {
        console.error("Error connecting to Mongo: ", err);
    });