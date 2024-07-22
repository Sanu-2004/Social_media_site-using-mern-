const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const { io, getSocketId } = require("../socket/socket");
const cloudinary = require("../utils/cloudinary");

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
        const sender = await User.findById(senderId);
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
            sender.conversations.push(conversation._id);
            receiver.conversations.push(conversation._id);
            await Promise.all([sender.save(), receiver.save()]);
        }
        const newMessage = await Message.create({
            content: message,
            sender: senderId,
            type,
        });
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;
        await conversation.save();
        const receiverSocketId = getSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendmessage", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const sendImage = async (req, res) => {
    const { receiverId, type = "image" } = req.body;
    let { image } = req.body;
    const senderId = req.user._id;
    if (!image || !receiverId) {
        return res.status(400).json({ error: "Please provide all fields" });
    }
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        return res.status(404).json({ error: "User not found" });
    }
    const sender = await User.findById(senderId);
    let conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
        conversation = await Conversation.create({
            members: [senderId, receiverId],
        });
        sender.conversations.push(conversation._id);
        receiver.conversations.push(conversation._id);
        await Promise.all([sender.save(), receiver.save()]);
    }
    if (image) {
        const imgUrl = await cloudinary.uploader.upload(image, {
            folder: "messageImages",
            width: 300,
        });
        image = imgUrl.secure_url;
    }
    const newMessage = await Message.create({
        content: image,
        sender: senderId,
        type,
    });
    conversation.messages.push(newMessage._id);
    conversation.lastMessage = newMessage._id;
    await conversation.save();
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(200).json(newMessage);
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
        if (!conversation.messages.length) {
            return res.status(200).json([]);
        }
        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessages", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllConversations = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({ path: "conversations", populate: { path: "members", select: ["username", "name", "profilePic", "_id"] } }).populate({ path: "conversations", populate: { path: "lastMessage" } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.conversations) {
            return res.status(200).json([]);
        }
        user.conversations.map((conversation) => {
            conversation.members.pull(req.user._id);
        })
        return res.status(200).json(user.conversations.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt));
    } catch (error) {
        console.log("Error in getAllConversations", error);
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



const searchConversationUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { key } = req.query;
        const user = await User.findById(userId).populate({
            path: "linked",
            select: ["email", "name", "username", "profilePic", "_id"],
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


module.exports = { sendmessage, getMessages, getConversation, searchConversationUser, getAllConversations, sendImage };