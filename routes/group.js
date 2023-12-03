const express = require('express')

const groupC = require('../controllers/group')
const userAuthenticate = require('../middlewear/auth')

const router = express.Router();

router.get('/get-userlist',userAuthenticate, groupC.getUserList)

router.post('/post-group-info',userAuthenticate, groupC.postGroupInfo)




module.exports = router