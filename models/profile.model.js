const { Schema, model } = require ("mongoose");

const safeMapSchema = new Schema(
    {
input: {
    type: String,
    required: [true, "Debes escribir algo para poder introducir el aviso"], 
    trim: true
},
location: {
    type:{
        type: String, 
        enum: ["Point"],
        default: "Point",
    },
coordinates:{
    type: [Number],
    default: [0,0]
},
},

owner: {
    type: Schema.Types.ObjectId,
    ref: "Safemap"
}

    });
    safeMapSchema.index({'location': '2dsphere'});

const safemap = model("Safemap", safeMapSchema)
module.exports = safemap 