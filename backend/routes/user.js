const express = require('express');
const { loginUser, registerUser, getProfile, logoutUser, getPublicPage } = require('../controllers/user');
const { checkAuthorization } = require('../middleswares/passport')
const router = express.Router();




router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(checkAuthorization, logoutUser)
router.route('/me').get(checkAuthorization, getProfile)
router.route('/').get(getPublicPage)


module.exports = router;
