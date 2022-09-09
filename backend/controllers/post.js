const Post = require('../models/posts')
const axios = require('axios')
exports.createPost = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/postservice/1.0.0`)
            
        const ip = findService.data.ip;
        const p = findService.data.port;

        axios.defaults.withCredentials = true;
        const result = await axios.post(`http://[${ip}]:${p}/createpost/${req.session.user._id}`,{
            title: req.body.title,
            desp: req.body.desp
        })

        res.status(200).json({s: findService.data, newPost:result.data})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}

exports.getAllPost = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/postservice/1.0.0`)
            
        const ip = findService.data.ip;
        const p = findService.data.port;

        axios.defaults.withCredentials = true;
        const result = await axios.get(`http://[${ip}]:${p}/post/all`)

        res.status(200).json({s: findService.data, newPost:result.data})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}

exports.deletePost = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/postservice/1.0.0`)
            
        const ip = findService.data.ip;
        const p = findService.data.port;

        axios.defaults.withCredentials = true;
        const result = await axios.delete(`http://[${ip}]:${p}/deletepost/${req.params.id}/${req.session.user._id}`)

        res.status(200).json({s: findService.data, deletedPost:result.data})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}

exports.editPost = async (req, res) => {
    try {
        const findService = await axios.get(`http://localhost:5000/find/postservice/1.0.0`)
            
        const ip = findService.data.ip;
        const p = findService.data.port;

        axios.defaults.withCredentials = true;
        const result = await axios.put(`http://[${ip}]:${p}/editpost/${req.params.id}/${req.session.user._id}`, {
            title: req.body.title,
            desp: req.body.desp 
        })

        res.status(200).json({s: findService.data, editedPost:result.data})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}