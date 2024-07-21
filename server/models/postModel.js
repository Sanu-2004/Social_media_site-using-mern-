const { text } = require('express');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: {
        type: String
    },
    image: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    comments: [
        {
            text: {
                type: String
            },
            commentedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;