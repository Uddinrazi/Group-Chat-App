const express = require('express')

const userC = require('../controllers/user');

const router = express.Router();

router.post('/post-user-data', userC.postUserInfo)

module.exports = router