const express = require('express');
const { getAllPost, createPost, deletePost, editPost } = require('../controllers/post');
const { checkAuthorization } = require('../middleswares/passport')
const router = express.Router();


router.route('/post/create').post(checkAuthorization, createPost);
router.route('/post/all').get(getAllPost)

router.route('/post/delete/:id').delete(checkAuthorization, deletePost)
router.route('/post/edit/:id').put(checkAuthorization, editPost)
module.exports = router;