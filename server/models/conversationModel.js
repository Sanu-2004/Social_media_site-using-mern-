const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }
},{timestamps: true});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;