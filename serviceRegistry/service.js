const express = require('express');
const ServiceRegistry = require('./ServiceRegistry');
const service = express();


module.exports = (config) => {
    const serviceRegistry = new ServiceRegistry(config.log())


    if(service.get('env') === 'development')
    {
        service.use((req, res, next) => {
            // console.log('service added')
            //here config will be logger's dev object as called in server.js with ['dev']
            config.log().debug(`${req.method}:${req.url}`) 
            return next();
        })
    }

//registering a service using PUT 
    service.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
        const {serviceName, serviceVersion, servicePort } = req.params;
        
        //const serviceIP =  '::1'   //'127.0.0.1' //req.headers['x-forwarded-for'] //req.ip;
        const serviceIP = req.ip
        const serviceKey = serviceRegistry._register(serviceName, serviceVersion, serviceIP, servicePort)
        return res.json({ result: serviceKey });
    })

//deleting a service using DELETE 
    service.delete('/register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
        const {serviceName, serviceVersion, servicePort } = req.params;
            const serviceIP = req.ip;
            const serviceKey = serviceRegistry._unregister(serviceName, serviceVersion, serviceIP, servicePort)
            return res.json({ result: serviceKey });
    })

//fining a service using GET
    service.get('/find/:serviceName/:serviceVersion', (req, res, next) => {
        const {serviceName, serviceVersion } = req.params;
        const svc = serviceRegistry._get(serviceName, serviceVersion)
        if(!svc){
            return res.status(404).json({result: 'Service not found!'})
        }
        return res.json(svc);
    })


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


