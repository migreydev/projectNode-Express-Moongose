// Importar el modelo Molino y la función de validación de express-validator
const Molino = require('../models/molino');
const { validationResult } = require('express-validator');

// Obtener la lista de todos los molinos
const getMolinos = async (req, res) => {
    try {
        const molinos = await Molino.find();
        res.status(200).json(molinos);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Obtener un molino específico por su ID
const getMolino = async (req, res) => {
    const idMolino = req.params.id;
    try {
        const molino = await Molino.find({ _id: idMolino });
        if (!molino.length) {
            return res.status(404).json({ msg: `No existe el molino con el id ${idMolino}` });
        }
        res.status(200).json({ molino });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Agregar un nuevo molino
const addMolino = async (req, res) => {
    // Validar si hay errores en la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Extraer nombre y tipo del cuerpo de la solicitud
    const { nombre, tipo } = req.body;
    // Crear una nueva instancia del modelo Molino
    const molino = new Molino({ nombre, tipo });

    try {
        // Verificar si ya existe un molino con el mismo nombre
        const newMolino = await Molino.findOne({ nombre });
        if (newMolino) {
            return res.status(400).json({ msg: "Ya existe un molino con ese nombre" });
        }

        // Guardar el nuevo molino en la base de datos
        await molino.save();
        res.json({ molino });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Actualizar un molino existente por su ID
const updateMolino = async (req, res) => {
    const idMolino = req.params.id;
    // Obtener el molino actual por su ID
    const molino = await Molino.find({ _id: idMolino });

    // Obtener los nuevos datos del molino desde el cuerpo de la solicitud
    const newMolino = req.body;

    try {
        // Verificar si el molino existe
        if (!molino.length) {
            return res.status(404).json({ msg: `No existe el molino con el id ${idMolino}` });
        }

        // Actualizar el molino en la base de datos
        await Molino.updateOne({ _id: idMolino }, newMolino);
        res.json({ newMolino });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Eliminar un molino por su ID
const deleteMolino = async (req, res) => {
    const idMolino = req.params.id;
    // Obtener el molino por su ID
    const molino = await Molino.find({ _id: idMolino });

    try {
        // Verificar si el molino existe
        if (!molino.length) {
            return res.status(404).json({ msg: `No existe el molino con el id ${idMolino}` });
        }

        // Eliminar el molino de la base de datos
        await Molino.deleteOne({ _id: idMolino });
        res.json({ molino });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Exportar las funciones del controlador
module.exports = { getMolinos, getMolino, addMolino, updateMolino, deleteMolino };
