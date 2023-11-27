
const Metodo = require('../models/metodo');
const { validationResult } = require('express-validator');

// Obtener la lista de todos los metodo
const getMetodos = async (req, res) => {
    try {
        const metodos = await Metodo.find();
        res.status(200).json(metodos);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Obtener un metodo específico por su ID
const getMetodo = async (req, res) => {
    const idMetodo = req.params.id;
    try {
        const metodo = await Metodo.find({ _id: idMetodo });
        if (!metodo.length) {
            return res.status(404).json({ msg: `No existe el metodo con el id ${idMetodo}` });
        }
        res.status(200).json({ metodo });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Agregar un nuevo metodo
const addMetodo = async (req, res) => {
    // Validar si hay errores en la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Extraer filtro y espresso del cuerpo de la solicitud
    const { filtro, espresso } = req.body;
    // Crear una nueva instancia del modelo Molino
    const metodo = new Metodo({ filtro, espresso });

    try {
        // Verificar si ya existe un metodo filter
        const newMetodo = await Metodo.findOne({ filtro });
        if (newMetodo) {
            return res.status(400).json({ msg: "Ya existe un metodo filtro" });
        }

        // Guardar el nuevo metodo en la base de datos
        await metodo.save();
        res.json({ metodo });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Actualizar un metodo existente por su ID
const updateMetodo = async (req, res) => {
    const idMetodo = req.params.id;
    // Obtener el metodo actual por su ID
    const metodo = await Metodo.find({ _id: idMetodo });

    // Obtener los nuevos datos
    const newMetodo = req.body;

    try {

        if (!metodo.length) {
            return res.status(404).json({ msg: `No existe el metodo con el id ${idMetodo}` });
        }
        
        // Actualizar el metodo en la base de datos
        await Metodo.updateOne({ _id: idMetodo }, newMetodo);
        res.json({ newMetodo });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


// Eliminar un metodo por su ID
const deleteMetodo = async (req, res) => {
    const idMetodo = req.params.id;
    // Obtener el metodo por su ID
    const metodo = await Metodo.find({ _id: idMetodo });

    try {
        // Verificar si el metodo existe
        if (!metodo.length) {
            return res.status(404).json({ msg: `No existe el metodo con el id ${idMetodo}` });
        }

        // Eliminar el metodo de la base de datos
        await Metodo.deleteOne({ _id: idMetodo });
        res.json({ metodo });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Exportar las funciones del controlador
module.exports = { getMetodos, getMetodo, addMetodo, updateMetodo, deleteMetodo };