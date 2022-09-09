const Post = require('../models/posts')

exports.createPost = async (req, res) => {
    try {
        const {title, desp } = req.body
        const newPost = { title, desp, createdById : req.params.userid}
        await Post.create(newPost)
        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}


exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}


exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id
        const userid = req.params.userid

        //checking if post exists
        const postToBeDeleted = await Post.findById(id)
        if(!postToBeDeleted)
        {
            return res.status(400).json({message: "Post not found! "})
        }

        //checking for authorization
        if (postToBeDeleted.createdById.toString() !== userid.toString())
        {
            return res.status(400).json({message: "You are not authorized to delete this post! "})
        }

        await postToBeDeleted.remove();
        res.status(200).json(postToBeDeleted)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}


exports.editPost = async (req, res) => {
    try {
        const id = req.params.id
        const userid = req.params.userid

        //checking if post exists
        const postToBeEdited = await Post.findById(id)
        if(!postToBeEdited)
        {
            return res.status(400).json({message: "Post not found! "})
        }

        //checking for authorization
        if (postToBeEdited.createdById.toString() !== userid.toString())
        {
            return res.status(400).json({message: "You are not authorized to edit this post! "})
        }
console.log(req.body.title)
        postToBeEdited.title = req.body.title,
        postToBeEdited.desp = req.body.desp;
        await postToBeEdited.save()

        res.status(200).json(postToBeEdited)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something wet wrong :( "})
    }
}