const rutas = require('express').Router()
const path = require('path')
const { unlink } =require('fs-extra')

const { uploadImage } = require('../middlewares/index.middleware')
const { ModeloImagen } = require('../models')

rutas.get('/', async (req, res) =>{
    const images = await ModeloImagen.find()
    res.render('index', {
        images
    })
})

rutas.get('/upload', async (req, res) =>{
    res.render('start/upload')
})

rutas.post('/upload', async (req, res) => {
    uploadImage(req, res, async (err) => {
        if(err){
            err.message = 'Error al cargar la Imagen'
            return res.send(err)
        }
        const image = new ModeloImagen();
        image.titulo = req.body.titulo;
        image.description = req.body.description;
        image.filename = req.file.filename;
        image.path = '/img/uploads/' + req.file.filename;
        image.originalname = req.file.originalname;
        image.mimetype = req.file.mimetype;
        image.size = req.file.size;
    
        await image.save();
        res.redirect('/');
    })
});

rutas.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await ModeloImagen.findById(id);
    res.render('start/perfil', { image });
});

rutas.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await ModeloImagen.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

module.exports = rutas