const express = require('express');
const { getProfile, updateProfile, deleteProfile, userSuggestions, linkUser, searchUser } = require('../controllers/userController');
const authorizeUser = require('../middleware/authorizeUser');


const router =express.Router();


router.get('/profile/:username', authorizeUser, getProfile);
router.post('/updateprofile', authorizeUser, updateProfile);
router.post('/deleteprofile', authorizeUser, deleteProfile);
router.get('/suggestion', authorizeUser, userSuggestions);
router.put('/link/:id', authorizeUser, linkUser);
router.get('/search', authorizeUser, searchUser);

module.exports = router;