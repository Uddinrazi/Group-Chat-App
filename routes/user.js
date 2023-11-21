const express = require('express')

const userC = require('../controllers/user');

const router = express.Router();

router.post('/post-user-data', userC.postUserInfo)

router.post('/post-login-data', userC.postLoginInfo)

module.exports = router