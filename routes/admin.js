const express = require('express')

const router = express.Router()
const userAuthenticate = require('../middlewear/auth')
const adminC = require('../controllers/admin')

router.get('/get-group-member/:id', userAuthenticate, adminC.getAdmins)

router.get('/get-all-user/:id', userAuthenticate, adminC.getAllUsers)

module.exports = router;

