import { useConversationContext } from "../Context/ConversationContext";
import { useSocketContext } from "../Context/SocketContext";
import { useUserContext } from "../Context/UserContext";

export const VideoCallHook = () => {
    const {socket} = useSocketContext();
    const {user} = useUserContext();
    const {setVideoCall} = useConversationContext();
    
    const StartCall = (u) => {
        setVideoCall(u._id);
        socket.emit("startcall", u._id, user.id);
    };

    return { StartCall };
};