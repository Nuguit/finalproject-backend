const Safemap = require("../models/profile.model");


const getSafeMap = async (_req, res) => {
    try {
        const form = await Safemap.find();
        res.send(contributions);
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
};



const postSafeMap = async (req, res) => {
    try {
        const { input, latitud, longitud } = req.body;
    const newContribution = new Safemap({
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



const added = async (req, res) => {
    const addedMap = req.params.added;
    res.send('Aviso añadido');
};

const contributions = async (_req, res) => {
    try {
        
        const allSafeMapEntries = await Safemap.find().sort({ createdAt: -1}).lean();
        res.json(allSafeMapEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





    module.exports = {getSafeMap , postSafeMap, added, contributions };


