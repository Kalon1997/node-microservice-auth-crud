const User = require('../models/user')

exports.registerUser = async (req, res) => {
    try {
        const {email, password } = req.body
        const newUser = { email, password }
        await User.create(newUser)
        res.status(200).json({success: true, newuser: newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password } = req.body
        const user = await User.findOne({ email }).select("+password")
        
        if (!user) {
            return res.status(400).json({
              success: false,
              message: "User does not exist",
            });
          }
        
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
              success: false,
              message: "Incorrect username or password",
            });
        }

        res.status(200).json({success: true, user : user})

    } catch (error) {
        res.status(500).json({message: "Something wet wrong :( "})
    }
}


exports.logoutUser = (req, res) => {
        try {
          req.session.destroy();
          console.log(req.session)
          res.status(200).json({success: true, message : "logged out"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Something wet wrong :( "})
        }
}


exports.getProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.params.userid.toString())

            if(!profile) {
               return res.status(500).json({success: false, message: " Profile not found! "})
            }

        res.status(200).json({success: true, profile , message: "Welcome to premium page"})
    } catch (error) {
        res.status(500).json({message: "Something wet wrong :( "})
    }
}

exports.getPublicPage = async (req, res) => {
    try {
        res.status(200).json({success: true, message: "Welcome to public page"})
    } catch (error) {
        res.status(500).json({success: false, message: "Something wet wrong :( "})
    }
}

