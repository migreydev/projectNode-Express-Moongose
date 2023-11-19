const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MolinoSchema = new Schema({
    nombre: String,
    tipo: String,

});

module.exports = mongoose.model('Molino', MolinoSchema);

