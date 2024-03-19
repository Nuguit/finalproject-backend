const { Schema, model } = require ("mongoose");

const safeMapSchema = new Schema(
    {
input: {
    type: String,
    required: [true, "Debes escribir algo para poder introducir el aviso"], //<-- AQUÍ IRÍA TAMBIÉN LOCATION O GOOGLE MAPS ME VA A DAR CÓDIGO PARA QUE APAREZCA???
    trim: true
},

    },
)

const safemap = model("Safemap", safeMapSchema)
module.exports = safemap 