const express = require('express');
const authorizeUser = require('../middleware/authorizeUser');
const { sendmessage, getMessages, getConversations, sendPost } = require('../controllers/messageController');

const router = express.Router();

router.post('/sendmessage', authorizeUser, sendmessage);
router.post('/sendpost', authorizeUser, sendPost);
router.get('/getmessage/:cId', authorizeUser, getMessages);
router.get('/getconversation', authorizeUser, getConversations);

module.exports = router;