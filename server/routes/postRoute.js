const express = require('express');
const { createPost, getPosts, getPost, deletePost, likePost, commentPost, deleteComment } = require('../controllers/postController');
const authorizeUser = require('../middleware/authorizeUser');

const router = express.Router();

router.post('/createpost', authorizeUser, createPost);
router.get('/getposts', authorizeUser, getPosts);
router.get('/getpost/:id', authorizeUser, getPost);
router.post('/deletepost/:id', authorizeUser, deletePost);
router.put('/likepost/:id', authorizeUser, likePost);
router.post('/comment', authorizeUser, commentPost);
router.delete('/deletecomment', authorizeUser, deleteComment);

module.exports = router;