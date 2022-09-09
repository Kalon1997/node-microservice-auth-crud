const express = require('express');
const { loginUser, registerUser, getProfile, logoutUser, getPublicPage } = require('../controllers/user');
const router = express.Router();

 
router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/myprofile/:userid').get(getProfile)
router.route('/').get(getPublicPage)

module.exports = router;
