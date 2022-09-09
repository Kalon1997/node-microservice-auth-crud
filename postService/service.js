const express = require('express');
const post = require('./routes/post')
const connection = require('./configs/db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const service = express();

module.exports = (config) => {

    const corsConfig = {
        credentials: true,
        origin: true,
    };
    

service.use(cors(corsConfig));
service.use(express.json({ limit: "50mb" }));
service.use(express.urlencoded({ limit: "50mb", extended: true }));
service.use(cookieParser());
service.use(bodyParser.urlencoded({ extended: true }));

connection()


    if(service.get('env') === 'development')
    {
        service.use((req, res, next) => {
            // console.log('service added')
            //here config will be logger's dev object as called in server.js with ['dev']
            config.log().debug(`${req.method}:${req.url}`) 
            return next();
        })
    }

 
    service.use(post)


    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        config.log().error(error);
        return res.json({
            error : {
                message: error.message
            }
        })
    })

    
    return service


}


