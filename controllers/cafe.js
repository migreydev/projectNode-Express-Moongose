const Cafe = require('../models/cafe');
const { validationResult } = require('express-validator');

const getCoffees = async (req, res) => {
    try {
        const coffees = await Cafe.find();
        res.status(200).json(coffees);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getCoffee = async (req, res) => {
    const idCoffee = req.params.id;
    try {
        const coffee = await Cafe.find({ _id: idCoffee });
        if (!coffee.length) {
            return res.status(404).json({ msg: `No existe el cafe con el id ${idCoffee}` });
        }
        res.status(200).json({ coffee });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const addCoffee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, origen, tipo, precio } = req.body;
    const coffee = new Cafe({ nombre, origen, tipo, precio });

    try {
        const newCoffee = await Cafe.findOne({ nombre });
        if (newCoffee) {
            return res.status(400).json({ msg: "Ya existe un café con ese nombre" });
        }

        await coffee.save();
        res.json({ coffee });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const updateCoffee = async (req, res) => {
    const idCoffee = req.params.id;
    const coffee = await Cafe.find({ _id: idCoffee });

    const newCoffee = req.body;

    try {

        if (!coffee.length) {
            return res.status(404).json({ msg: `No existe el cafe con el id ${idCoffee}` });
        }

        await Cafe.updateOne({ _id: idCoffee }, newCoffee);
        res.json({ newCoffee });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteCoffee = async (req, res) => {
    const idCoffee = req.params.id;
    const coffee = await Cafe.find({ _id: idCoffee });

    try {
        if (!coffee.length) {
            return res.status(404).json({ msg: `No existe el cafe con el id ${idCoffee}` });
        }

        await Cafe.deleteOne({ _id: idCoffee });
        res.json({ coffee });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = { getCoffees, getCoffee, addCoffee, updateCoffee, deleteCoffee };
