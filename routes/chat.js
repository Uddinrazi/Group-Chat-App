const express = require('express');

const chatC = require('../controllers/chat')
const userAuthenticate = require('../middlewear/auth')

const router = express.Router();

router.post('/post-chats', userAuthenticate,chatC.postChats)

router.get('/get-chats',userAuthenticate,chatC.getChats)

module.exports = router;