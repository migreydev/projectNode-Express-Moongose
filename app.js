// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Molino = require('./models/molino');
const Metodo = require('./models/metodo');
const Cafe = require('./models/cafe');

// Crear una instancia de Express
const app = express();

require('dotenv').config();
mongoose.set("strictQuery", false);
// Habilitar CORS 
app.use(cors());
app.use(express.json());

// Función que conecta a la base de datos
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`);
    } catch (err) {
        console.log(err);
    }
}

//Solicitud POST Molino
app.post('/molino', async (req, res) => {
    try {
        // Crear un nuevo molino en la base de datos usando el modelo Molino
        const nuevoMolino = await Molino.create(req.body);
        res.status(201).json(nuevoMolino);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Solicitud GET a /molino
app.get('/molino', async (req, res) => {
    try {
        // Obtener la lista de molinos desde la base de datos
        const molinos = await Molino.find();
        
        // Responder con la lista de molinos en formato JSON
        res.status(200).json(molinos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


//Solicutud POST metodo
app.post('/metodo', async (req,res) => {
    try{
        const nuevoMetodo = await Metodo.create(req.body);
        res.status(201).json(nuevoMetodo);
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
})


main().catch((err) => console.log(err));


app.listen(process.env.PORT, () => {
    console.log(`El servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
