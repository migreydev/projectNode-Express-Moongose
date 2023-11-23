// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Molino = require('./models/molino');
const Metodo = require('./models/metodo');
const Cafe = require('./models/cafe');

// Instancia de Express
const app = express();


require('dotenv').config();
mongoose.set("strictQuery", false);
// Habilitar CORS para manejar las solicitudes
app.use(cors());
app.use(express.json());

app.use('/cafe', require('./routes/cafe'));
app.use('/molino', require('./routes/molino'));




// Función que conecta a la base de datos
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`);
    } catch (err) {
        console.log(err);
    }
}


// Llamamos a la función 
main().catch((err) => console.log(err));


app.listen(process.env.PORT, () => {
    console.log(`El servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
