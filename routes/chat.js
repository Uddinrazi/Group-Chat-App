const express = require('express');

const chatC = require('../controllers/chat')
const userAuthenticate = require('../middlewear/auth')

const router = express.Router();

router.post('/post-chats', userAuthenticate, chatC.postChats)

router.post('/post-group-chats', userAuthenticate, chatC.postGroupChats)

router.get('/get-chats',userAuthenticate,chatC.getChats)

router.get('/get-group-list', userAuthenticate, chatC.getGroupOnMainPage)

router.get('/get-group-chats',userAuthenticate,chatC.getGroupChats)


module.exports = router;