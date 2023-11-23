
// Solicitud GET a /molino
app.get('/metodo', async (req, res) => {
    try {
        // Obtener la lista de metodos desde la base de datos
        const metodos = await Metodo.find();
        
        // Responder con la lista de metodos en formato JSON
        res.status(200).json(metodos);
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