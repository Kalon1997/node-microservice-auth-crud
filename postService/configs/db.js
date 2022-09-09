const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODBURI
        )
        console.log("db connected");
    } catch (error) {
        console.log("db NOT connected", error);
    }
}