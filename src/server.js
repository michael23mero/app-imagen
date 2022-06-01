const express = require('express')
const path = require('path')

const { format } = require('timeago.js');

class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3030

        require('./config/dbc').dbc();
        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use((req, res, next) => {
            this.app.locals.format = format;
            next();
        })
    }

    routes(){
        this.app.use(require('./routes/index.routes'))
    }

    views(){
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'ejs')
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a sus servicio en el puerto: ${this.port}`)
        })
    }
}

module.exports = Servidor