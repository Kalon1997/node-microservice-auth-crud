const User = require('../models/user')
const axios = require('axios')
const loggerConfig = require('../configs/loggerfile')['development']

exports.registerUser = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/authservice/1.0.0`)
         
        const ip = findService.data.ip;
        const p = findService.data.port;
        
        const result = await axios.post(`http://[${ip}]:${p}/register`,{
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).json({s: findService.data, u:result.data})
    } catch (error) {
        loggerConfig.log().error(`authservice : http://[${ip}]:${p}/register failed to register user. Error: error.message`)
        res.status(500);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/authservice/1.0.0`)

        axios.defaults.withCredentials = true
        const result = await axios.post(`http://[${findService.data.ip}]:${findService.data.port}/login`, {
            email: req.body.email,
            password: req.body.password
        }, {
            headers: {
              "Content-Type": "application/json",
            }
          })
        if(result.data.success === true)
        {
            req.session.isAuth = true;
            req.session.user = result.data.user
            return res.status(200).json({s: findService.data, u: result.data})
        } 

        return res.status(400).json({message: result.data.message})
    } catch (error) {

        res.json({message: error})
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy()
        res.status(200).json({message: "logged out"})
    } catch (error) {

        res.json({message: error})
    }
}

exports.getProfile = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/authservice/1.0.0`)
         
        const ip = findService.data.ip;
        const p = findService.data.port;
        axios.defaults.withCredentials = true;
        const result = await axios.get(`http://[${ip}]:${p}/myprofile/${req.session.user._id}`, {
            headers: {
              "Content-Type": "application/json",
            }
          })

        res.status(200).json({s: findService.data, u: result.data})
    } catch (error) {

        res.json({message: error})
    }
}

exports.getPublicPage = async  (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/authservice/1.0.0`)
         
        const ip = findService.data.ip;
        const p = findService.data.port;
        
        const result = await axios.get(`http://[${ip}]:${p}/`)

        res.status(200).json({s: findService.data, u:result.data})
    } catch (error) {

        res.json({message: error})
    }
}


