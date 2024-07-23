const { PeerServer } = require("peer");


const peerServer = () => {
    const peerServer = PeerServer({
        port: 9000,
        path: "/peer",
    });
};

module.exports = peerServer;