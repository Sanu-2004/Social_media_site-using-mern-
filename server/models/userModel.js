const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true
    },
    profilePic: {
        type: String,
        default: 'https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
    },
    bio: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: []
        }
    ],
    linkers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    linked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    conversations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            default: []
        }
    ]
},{timestamps: true});

userSchema.index({ name: 'text', username: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;