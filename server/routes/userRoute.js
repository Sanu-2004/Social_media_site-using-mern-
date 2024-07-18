const express = require('express');
const { getMyProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const authorizeUser = require('../middleware/authorizeUser');


const router =express.Router();

router.get('/profile', authorizeUser, getMyProfile);
router.get('/profile/:username', authorizeUser, getProfile);
router.post('/updateprofile', authorizeUser, updateProfile);
router.post('/deleteprofile', authorizeUser, deleteProfile);

module.exports = router;