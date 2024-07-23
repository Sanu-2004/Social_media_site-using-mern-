
const StartCall = (socket, peerMap, getSocketId) => {
    const getPeerId = (userId) => {
        if (peerMap[userId]) {
            return peerMap[userId];
        }
        return null;
    };
    socket.on("startcall", (userId, callerId) => {
        const socketId = getSocketId(userId);
        console.log(getSocketId(callerId));
        if (socketId) {
            console.log("Calling user", userId);
            socket.to(socketId).emit("calluser", callerId);
        }
    });   
    socket.on("endcall", (userId) => {
        const socketId = getSocketId(userId);
        if (socketId) {
            socket.to(socketId).emit("endcall");
        }
    });
};

module.exports = { StartCall };