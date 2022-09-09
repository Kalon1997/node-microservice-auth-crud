const Mongoose = require('mongoose')

const postSchema = new Mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desp:{
        type:String,
        required:true,
    },
    // owner : {
    //     type: Mongoose.Types.ObjectId,
    //     ref: "User",
    // },
    createdById:{
        type:Mongoose.Schema.ObjectId,
        ref:"User",
    },
})

module.exports = Mongoose.model("Post", postSchema);