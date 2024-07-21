const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const sendmessage = async (req, res) => {
    try {
        const { message, receiverId, type = "text" } = req.body;
        const senderId = req.user._id;
        if (!message || !receiverId) {
            return res.status(400).json({ error: "Please provide all fields" });
        }
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found" });
        }

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = await Message.create({
            content: message,
            sender: senderId,
            type,
        });
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;
        await conversation.save();
        return res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendmessage", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const cId = req.params.cId;
        const conversation = await Conversation.findById(cId).populate("messages");
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        if (!conversation.messages) {
            return res.status(200).json([]);
        }
        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessages", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const friend = req.query.friend;
        const conversation = await Conversation.findOne({ members: { $all: [userId, friend] } }).populate("lastMessage");
        if (!conversation) {
            return res.status(404).json({ error: "Conversations not found" });
        }
        return res.status(200).json(conversation);
    } catch (error) {
        console.log("Error in getConversation", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const sendPost = async (req, res) => {
    try {
        const { postId, receiverId, type = "post" } = req.body;
        const senderId = req.user._id;
        if (!postId || !receiverId) {
            return res.status(400).json({ error: "Please provide all fields" });
        }
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found" });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = await Message.create({
            content: postId,
            sender: senderId,
            type,
        });
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;
        await conversation.save();
        return res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendPost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const searchConversationUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { key } = req.query;
        const user = await User.findById(userId).populate({
            path: "linked",
            select: ["email", "name", "username", "profilePic","_id"],
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        let linkedUsers = user.linked.filter((u) => u.name.includes(key));
        return res.status(200).json(linkedUsers);
    } catch (error) {
        console.log("Error in searchLinkedUser", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}


module.exports = { sendmessage, getMessages, getConversation, sendPost, searchConversationUser };