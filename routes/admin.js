const express = require('express')

const router = express.Router()
const userAuthenticate = require('../middlewear/auth')
const adminC = require('../controllers/admin')

router.get('/get-group-member/:id', userAuthenticate, adminC.getAdmins)

router.get('/get-all-user/:id', userAuthenticate, adminC.getAllUsers)

router.post('/add-new-users/:id', userAuthenticate, adminC.addNewUserToExistingGroup)

router.delete('/delete-group-user/:id1/:id2',userAuthenticate,adminC.deleteGroupUsers)

module.exports = router;

