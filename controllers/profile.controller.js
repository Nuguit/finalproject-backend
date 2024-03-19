const safeMap = require("../models/profile.model");


//RUTA PARA ENSEÑAR EL FORMULARIO A RELLENAR EN EL SAFEMAP

const getSafeMap = 

router.get('/safemap', async (_req, res) => {
    try {
        const form = await safeMap.find();
        res.send();
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});



const postSafeMap = 
//RUTA PARA AÑADIR Y GUARDAR EL NUEVO AVISO
router.post('/safemap', async (req, res) => {
    try {
        const newSafeMapEntry = new safemap(req.body);
        await newSafeMapEntry.save();
        res.send('¡Gracias!Tu aviso ha sido añadido a SafeMap con éxito'); 
    } catch (error) {
        res.status(400).send('Error al procesar la solicitud: ' + error);
    }
});



const added = 
// RUTA UNA VEZ AÑADIDO, PÁGINA QUE SALDRÍA AL COMPLETAR CON ÉXITO LA RUTA ANTERIOR
router.get('/safemap/:added', (req, res) => {
    const added = req.params.added
    res.send();
});

const contributions = 
// RUTA PARA MOSTRAR TODAS LAS CONTRIBUCIONES
router.get('/contributions', async (_req, res) => {
    try {
        // Obtener todos los documentos de safemap
        const allSafeMapEntries = await safemap.find().sort({ createdAt: -1}).lean();
        res.json(allSafeMapEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





    module.exports = {getSafeMap , postSafeMap, added, contributions };


