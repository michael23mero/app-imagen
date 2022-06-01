const { default: mongoose } = require('mongoose')
const { Schema, model } = require('mongoose')

const esquemaImagen = new Schema(
    {
        titulo: {
            type: String
        },
        description: {
            type: String
        },
        filename: {
            type: String
        },
        path: {
            type: String
        },
        originalname: {
            type: String
        },
        mimetype: {
            type: String
        },
        size: {
            type: Number
        },
        created_at: {
            type: Date, default: Date.now()
        }
    },
    {
        //timestamps: { createdAt: true, updatedAt: true }
    }
)

module.exports = model('coleccionimagen', esquemaImagen)