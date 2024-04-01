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

const contributions = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('ID de usuario:', userId)
    const userWarnings = await safemap.find({ owner: userId }, { _id: 0, input: 1, location: 1 }).lean();
    console.log('Avisos de seguridad encontrados:', userWarnings)
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
      const { email, password, username, avatar } = req.body;
      if (!Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user id.' });
    }
    const updatedProfile = await User.findByIdAndUpdate (
      user_id,
      {
        email,
        password, 
        username,
        avatar
      },
      {new: true}
    )
    res.status(200).json({message: 'User has been updated', user: updatedProfile});
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

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const imageUrl = req.file.path; // O la URL de la imagen en Cloudinary

    // Suponiendo que estás utilizando Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path); // Sube la imagen a Cloudinary
    const cloudImage = cloudinaryResponse.secure_url; // Obtiene la URL de la imagen de la respuesta de Cloudinary

    // Actualiza el campo de avatar del usuario en la base de datos
    await User.findByIdAndUpdate(userId, { avatarUrl: cloudImage });

    res.status(200).json({ message: "Avatar actualizado exitosamente.", imageUrl });
  } catch (error) {
    next(error);
  }
};


module.exports = { getSafeMap, contributions, postSafeMap,  editProfile , deleteUser, uploadAvatar };








