const { Schema, model } = require ("mongoose");

const safeMapSchema = new Schema(
    {
name: {
    type: String,
    required: [true, "Debes escribir algo para poder introducir el aviso"],
    trim: true
},

    },
)

const safemap = model("Safemap", safeMapSchema)
module.exports = safemap 