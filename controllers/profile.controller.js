const safemap = require("../models/profile.model");
const User = require("../models/user.model");
const { Types } = require('mongoose');

const getSafeMap = async (_req, res) => {
  try {
    const allCoordinates = await safemap.find({}, { _id: 0, input: 1, location: 1 }).lean();
    if (!allCoordinates) {
      throw new Error('No se pudieron obtener los datos');
    }
    res.json(allCoordinates);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getSafeMapByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const userWarnings = await safemap.find({ owner: ownerId }, { _id: 0, input: 1, location: 1 }).lean();
    if (!userWarnings) {
      throw new Error('No se encontraron avisos por este usuario');
    }
    res.json(userWarnings);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const postSafeMap = async (req, res) => {
  try {
    const { input, location } = req.body;
    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      throw new Error('Las coordenadas del marcador son inválidas');
    }

    const [longitud, latitud] = location.coordinates;

    if (isNaN(longitud) || isNaN(latitud)) {
      throw new Error('Las coordenadas del marcador deben ser numéricas');
    }

    const newContribution = new safemap({
      input,
      location: {
        type: "Point",
        coordinates: [longitud, latitud],
      },
      owner: req.user.id
    });

    await newContribution.save();
    res.status(201).send('Coordenadas almacenadas correctamente');
  } catch (error) {
    console.error('Error al almacenar coordenadas:', error);
    res.status(500).send('Error interno del servidor');
  }
};





const editProfile = async (req, res, next) => {
    try {
      const { _id: user_id } = req.user
      const { email, password, username } = req.body;
      if (!Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user id.' });
    }
    const updatedProfile = await User.findByIdAndUpdate (
      user_id,
      {
        email,
        password, 
        username
      },
      {new: true}
    )
    res.status(200).json({message: 'User has been updated', updatedProfile: updatedProfile});
  } catch (err) {
      next(err)
  }
}


const deleteUser = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user
        
        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id.' });
        }

        const user = await User.findByIdAndDelete(user_id)

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }

        res.status(200).json({message: 'User successfully deleted.'});
    } catch (err) {
        next(err)
    }
}




module.exports = { getSafeMap, getSafeMapByOwner, postSafeMap,  editProfile , deleteUser };








