const Mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new Mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
})

// bcrypting password always before saving
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
 
module.exports = Mongoose.model("User", userSchema);