const mongoose = require('mongoose')
const loggerConfig = require('../logger')['development']
module.exports = async () => {
    try {
        await mongoose.connect(
            process.env.MONGOURI
        )
        loggerConfig.log().info('MongoDB database connected')
    } catch (error) {
        loggerConfig.log().error(`Could NOT connect MongoDB database! with error ${error.message}`)
    }
}