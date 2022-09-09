require('dotenv').config({ path: __dirname + '/configs/.env' });
const http = require('http')
const loggerConfig = require('./logger')['development'] // dev: {...., log}
const service = require('./service')(loggerConfig);


const SERVICEREGISTRY_PORT = 5000
const server = http.createServer(service)
const axios = require('axios')


server.listen(0);

server.on('listening', () => {
//this below 5000 is serviceRegistry's PORT
   const registerService = () => {
       axios.put(`http://localhost:${SERVICEREGISTRY_PORT}/register/${loggerConfig.name}/${loggerConfig.version}/${server.address().port}`)
   } 

   const unregisterService = () => {
        axios.delete(`http://localhost:${SERVICEREGISTRY_PORT}/register/${loggerConfig.name}/${loggerConfig.version}/${server.address().port}`)
    } 

   registerService();

   const interval = setInterval(registerService, 20000)

  process.on('uncaughtException', () => {
    unregisterService()
    clearInterval(interval)
//       process.exit(0)
  })

  process.on('SIGINT', () => {
      unregisterService()
      clearInterval(interval)
  }) //ctrl + c press

 process.on('SIGTERM', () => {   
    unregisterService()
    clearInterval(interval)
  }) //killing process

  loggerConfig.log().info(
    ` Listening on PORT ${server.address().port} in ${service.get('env')} mode}`,
    );
});