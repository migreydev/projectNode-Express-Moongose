


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