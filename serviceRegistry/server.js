const express = require('express')
const http = require('http')
const app = express()
const loggerConfig = require('./logger')['development'] // dev: {blah.., log}
const service = require('./service')(loggerConfig);
const PORT = 5000;
const server = http.createServer(service)
// const semver = require('semver')

// server.use(semver.SemVer);

server.listen(5000);

server.on('listening', () => {
  loggerConfig.log().info(
    ` Listening on PORT ${server.address().port} in ${service.get('env')} mode}`,
    );
});