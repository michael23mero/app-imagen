const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: 'src/public/img/uploads',
    filename: (req, file, cb) =>{
        let now = new Date()
        cb(null, `IMG_${now.getFullYear()}${now.getMonth()+1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}` + path.extname(file.originalname))
    }
})

const uploadImage = multer({
    storage: storage,
    //limits: {fileSize : 1000000},
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }else{
            cb('Error en extension de imagen xd')
        }
    }
}).single('image')

module.exports = {
    uploadImage
}