const safemap = require("../models/profile.model");
const User = require("../models/user.model");


const getSafeMap = async (_req, res) => {
  try {
    const allCoordinates = await safemap.find({}, { _id: 0, input: 1, location: 1 }).lean();
    res.json(allCoordinates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const postSafeMap = async (req, res) => {
  try {
    const { input, latitud, longitud } = req.body;
    const newContribution = new safemap({
      input,
      location: {
        type: "Point",
        coordinates: [longitud, latitud]
      }
    });
    await newContribution.save();
    res.status(201).send('Coordenadas almacenadas correctamente');
  } catch (error) {
    console.error('Error al almacenar coordenadas:', error);
    res.status(500).send('Error interno del servidor');
  }
};



const contributions = async (_req, res) => {
  try {
    const contributionsData = await safemap.find({}, { input: 1, location: 1 }).lean();
    if (contributionsData.length > 0) {
      res.json({ contributions: contributionsData });
    } else {
      res.json({ message: '¡Vaya! Aún no hay nada por aquí.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    


module.exports = { getSafeMap, postSafeMap, contributions, editProfile };








