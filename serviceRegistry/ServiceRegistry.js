const semver = require('semver')
class ServiceRegistry {
    constructor(log){  //pass loggerfile['dev'].log() as log
        this.log = log;
        this.services = {} //map
        this.serviceTimeOut = 30; //30 ms
    }


    _get(name, version){
        this._cleanup()
        var candidates = Object.values(this.services)
            .filter(service => service.name === name && service.version === version) //  && semver.satisfies(service.version, version)
        console.log(candidates)

        //addig randomness for load balancing
        return candidates[Math.floor(Math.random() * candidates.length)]
    }


    _register(name, version, ip, port){
        this._cleanup()
        const key = name+version+ip+port

        if(!this.services[key])  //if service is already in services[]
        {
            this.services[key] = {
                timeStamp : Math.floor(new Date() / 1000),  //unique timestamp in secs
                ip,
                port,
                name,
                version
            }
            //this.log.debug(`Added service ${this.services[key]} `)
            this.log.debug(`Just Added service - ${name} : ${version} into ${ip} @ ${port} `)
        }

        else
        {
            this.services[key].timeStamp = Math.floor(new Date() / 1000);
            this.log.debug(`Just Updated service - ${name} : ${version} into ${ip} @ ${port} `)
        }
        // console.log(this.services)
        return key;
    }


    _unregister(name, version, ip, port){
        this._cleanup()
        const key = name+version+ip+port;
        delete this.services[key]
        // this.services.splice(key,1)
        this.log.debug(`Just Unregistered service - ${name} : ${version} into ${ip} @ ${port} `)
        return key;
    }

    //services will re-register themselves but if any timeout issue, service needs to be deleted
    _cleanup()
    {
        const now = Math.floor(new Date() / 1000)
        Object.keys(this.services).forEach((key) => {
            if(this.services[key].timeStamp + this.serviceTimeOut < now) {
                this.log.debug(`${this.services[key].name} : ${this.services[key].version} got TIMED-OUT, hence REMOVED `)
                delete this.services[key]
            }
        })
    }



}

module.exports = ServiceRegistry