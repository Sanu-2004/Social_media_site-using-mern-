const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, 'Please provide content']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide sender']
    },
    type: {
        type: String,
        default: 'text',
        enum : ['text', 'image', 'post']
    },
},{timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;