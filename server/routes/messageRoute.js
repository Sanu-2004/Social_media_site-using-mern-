const express = require('express');
const authorizeUser = require('../middleware/authorizeUser');
const { sendmessage, getMessages, getConversation, sendPost, searchConversationUser } = require('../controllers/messageController');

const router = express.Router();

router.post('/sendmessage', authorizeUser, sendmessage);
router.post('/sendpost', authorizeUser, sendPost);
router.get('/getmessage/:cId', authorizeUser, getMessages);
router.get('/getconversation', authorizeUser, getConversation);
router.get('/search', authorizeUser, searchConversationUser);

module.exports = router;