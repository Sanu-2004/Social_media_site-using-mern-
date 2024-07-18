const express = require('express');
const authorizeUser = require('../middleware/authorizeUser');
const { sendNotification, getNotifications, deleteNotification, deleteAllNotifications } = require('../controllers/notificationController');

const router = express.Router();

router.post('/sendnotification', authorizeUser, sendNotification);
router.get('/getnotification', authorizeUser, getNotifications);
router.post('/deletenotification/:id', authorizeUser, deleteNotification);
router.post('/deletenotifications', authorizeUser, deleteAllNotifications);

module.exports = router;