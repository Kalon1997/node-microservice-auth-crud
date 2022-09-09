const express = require('express');
const { getAllPost, createPost, deletePost, editPost } = require('../controllers/post');
const router = express.Router();


router.route('/createpost/:userid').post(createPost);
router.route('/post/all').get(getAllPost)

router.route('/deletepost/:id/:userid').delete(deletePost);
router.route('/editpost/:id/:userid').put(editPost);
module.exports = router;