const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetodoSchema = new Schema({
    filtro: String,
    espresso: String,
});

module.exports = mongoose.model('Metodo', MetodoSchema);
