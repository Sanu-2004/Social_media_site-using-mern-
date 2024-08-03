import { useConversationContext } from "../Context/ConversationContext";
import { useSocketContext } from "../Context/SocketContext";
import { useUserContext } from "../Context/UserContext";
import { toast } from "react-hot-toast";

export const VideoCallHook = () => {
    const { socket } = useSocketContext();
    const { user } = useUserContext();
    const { videoCall, setVideoCall } = useConversationContext();

    const StartCall = (u) => {
        setVideoCall(u._id);
        socket.emit("startcall", u._id, user.id);
    };
    const EndCall = (caller=videoCall) => {
        socket.emit("endcall", caller);
        setVideoCall(null);
        toast.success("Call Ended");
    };

    return { StartCall, EndCall };
};