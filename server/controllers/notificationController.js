const Notification = require("../models/notificationModel");

const sendNotification = async (req, res) => {
    try {
        const {receiverId, content } = req.body;
        const senderId = req.user._id;
        const notification = await Notification.create({
            sender: senderId,
            receiver: receiverId,
            content,
        });
        return res.status(200).json(notification);
    } catch (error) {
        console.log("Error in sendNotification", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiver: req.user._id }).populate('sender');
        notifications.map(notification => {
            notification.sender.password = undefined;
            notification.sender.posts = undefined;
            notification.sender.linkers = undefined;
            notification.sender.linked = undefined;
            notification.sender.bio = undefined;
            notification.sender.link = undefined;
        });
        return res.status(200).json(notifications.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        console.log("Error in getNotifications", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        if (notification.receiver.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this notification" });
        }
        await Notification.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNotification", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ receiver: req.user._id });
        return res.status(200).json({ message: "All notifications deleted successfully" });
    } catch (error) {
        console.log("Error in deleteAllNotifications", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendNotification, getNotifications, deleteNotification, deleteAllNotifications };