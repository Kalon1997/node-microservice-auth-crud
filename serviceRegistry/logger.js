const bunyan = require('bunyan')
const pkg = require('./package.json')

const {name, version} = pkg;

const getLogger = (name, version, level) => bunyan.createLogger({
    name: `${name}:${version}`,
    level
})

module.exports = {
    development: {
        name,
        version,
        serviceDefaultTimeout: 30,
        levelOfIssue: 'debug',
        log : () => getLogger(name, version, 'debug')
    },
    production: {
        name,
        version,
        serviceDefaultTimeout: 30,
        levelOfIssue: 'info',
        log : () => getLogger(name, version, 'info')
    },
    test: {
        name,
        version,
        serviceDefaultTimeout: 30,
        levelOfIssue: 'fatal',
        log : () => getLogger(name, version, 'fatal')
    }
}