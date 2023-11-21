const express = require('express');

const chatC = require('../controllers/chat')

const router = express.Router();

router.post('/post-chats', chatC.postChats)

module.exports = router;