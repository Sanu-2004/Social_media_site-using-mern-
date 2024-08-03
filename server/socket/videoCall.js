
const StartCall = (socket, peerMap, getSocketId) => {
    socket.on("startcall", (userId, callerId) => {
        const socketId = getSocketId(userId);
        // console.log(getSocketId(callerId));
        if (socketId) {
            // console.log("Calling user", userId);
            socket.to(socketId).emit("calluser",peerMap, callerId);
        }
    });   
    socket.on("endcall", (userId) => {
        const socketId = getSocketId(userId);
        if (socketId) {
            socket.to(socketId).emit("endcall", peerMap);
        }
    });
};

module.exports = { StartCall };