const express = require('express')

const groupC = require('../controllers/group')
//const userAuthenticate = require('../middlewear/auth')

const router = express.Router();

router.get('/get-userlist', groupC.getUserList)

module.exports = router