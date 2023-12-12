const express = require('express');

const chatC = require('../controllers/chat')
const userAuthenticate = require('../middlewear/auth')

const router = express.Router();



router.post('/post-group-chats', userAuthenticate, chatC.postGroupChats)

//router.get('/get-chats/:id',userAuthenticate,chatC.getChats)

router.get('/get-group-list', userAuthenticate, chatC.getGroupOnMainPage)

router.get('/get-group-chats/:id', userAuthenticate, chatC.getGroupChats)

//router.post("/upload", upload.single('media'),userAuthenticate,chatC.uploadMedia);


module.exports = router;