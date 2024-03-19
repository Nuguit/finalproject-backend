const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
        email: {
      type: String,
      required: [true, 'Necesitamos un mail :('],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Debes escribir un mail válido!',
      ],
    },
    password: {
      salt: { type: String, required: true },
      hash: { type: String, required: true },
    },
    username: {
      type: String,
      required: [true, '¡Sé creativ@! Elige un nombre de usuari@'],
      unique: true,
      trim: true,
    },

    contributions: [{type: Schema.Types.ObjectId, ref: Safemap}] //<-- AQUÍ SE ALMACENARÍAN LAS CONTRIBUCIONES=MARCADORES DE GOOGLE MAPS?
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model('User', userSchema);

module.exports = User;