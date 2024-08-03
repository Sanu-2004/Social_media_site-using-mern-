import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { Peer } from "peerjs";
import { useConversationContext } from "./ConversationContext";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
const connectPeer = () => {
  const peerId = uuidv4();
  const newPeer = new Peer(peerId, {
    host: "localhost",
    port: 9000,
    path: "/peer",
    config: {
      iceServers: [
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun1.l.google.com:19302" },
        { url: "stun:stun2.l.google.com:19302" },
        { url: "stun:stun3.l.google.com:19302" },
        { url: "stun:stun4.l.google.com:19302" },
      ],
    },
  });
  return newPeer;
};

export const SocketProvider = ({ children }) => {
  const { user } = useUserContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [peer, setPeer] = useState({});
  const [peerMap, setPeerMap] = useState({});
  const {videoCall, setVideoCall} = useConversationContext();

  useEffect(() => {
    if (user) {
      const newPeer = connectPeer();
      setPeer(newPeer);
      const newSocket = io(`http://localhost:8000`, {
        query: {
          userId: user.id,
          peerId: newPeer.id,
        },
        secure: true,
      });
    //   console.log(newPeer);
      setSocket(newSocket);
      newSocket.on("online", (data) => {
        setOnlineUsers(data);
      });
      newSocket.on("peerMap", (data) => {
        setPeerMap(data);
      });
      newSocket.on("endcall", (map) => {
        setVideoCall(null);
        setPeerMap(map);
        toast.success("Call Ended");
        const newPeer = connectPeer();
        setPeer(newPeer);
      });
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, videoCall]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, peer, peerMap, setPeerMap }}>
      {children}
    </SocketContext.Provider>
  );
};
