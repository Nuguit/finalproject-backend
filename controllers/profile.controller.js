const safemap = require("../models/profile.model");
const User = require("../models/user.model");


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
    const ownerId = req.user.id;
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
    const { input, latitud, longitud } = req.body;
    const newContribution = new safemap({
      input,
      location: {
        type: "Point",
        coordinates: [longitud, latitud],
              },
              owner: req.user._id
    });
    await newContribution.save();
    res.status(201).send('Coordenadas almacenadas correctamente');
  } catch (error) {
    console.error('Error al almacenar coordenadas:', error);
    res.status(500).send('Error interno del servidor');
  }
};






const editProfile = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const profile = await User.findByIdAndUpdate(
      req.params.edit_id,
      { email, password, username },
      { new: true }
    ).select('-createdAt -updatedAt');

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};




module.exports = { getSafeMap, getSafeMapByOwner, postSafeMap,  editProfile };








