

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

