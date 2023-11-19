const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CafeSchema = new Schema({
    nombre: String,
    origen: String,
    tipo: String,
    precio: Number,
});

module.exports = mongoose.model('Cafe', CafeSchema);