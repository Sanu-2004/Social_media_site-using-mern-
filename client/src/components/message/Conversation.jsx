import React, { useEffect, useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import { useConversationContext } from "../../Context/ConversationContext";
import { useSocketContext } from "../../Context/SocketContext";
import { VideoCallHook } from "../../Hooks/VideoCallHook";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";



const Conversation = ({ c }) => {
  const { setConversation, setVideoCall } = useConversationContext();
  const { onlineUsers } = useSocketContext();
  const { StartCall } = VideoCallHook();
  const { socket } = useSocketContext();
  const [isCalling, setIsCalling] = useState(false);
  const {user} = useUserContext();
  const navigate = useNavigate();

  const handleCall = async () => {
    StartCall(c.members[0]);
    navigate("/video/"+c.members[0]._id);
  };

  const handleClick = () => {
    setConversation(c);
  };
  useEffect(() => {
    setConversation(null);
    socket.on("calluser", (callerid) => {
      if (c.members[0]._id === callerid) {
        setIsCalling(callerid);
        navigate("/video/"+callerid);
      }
    });
  }, [socket]);
  return (
    <div className="snap-center border-b last:border-0">
      <div className="flex items-center justify-between my-2 p-3">
        <div
          className="flex gap-3 items-center w-full cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={c.members[0].profilePic}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="pl-2">{c.members[0].name}</span>
              {onlineUsers?.includes(c.members[0]._id) && (
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
              )}
            </div>
            <span className="pl-2 text-two text-sm">
              @{c.members[0].username}
            </span>
            <span className="pl-2 overflow-hidden h-5 text-sm">
              {c.lastMessage?.sender === c.members[0]._id
                ? c.members[0].name.split(" ")[0]
                : "you"}
              : {c.lastMessage?.type === "image" && "Shared a Image"}
              {c.lastMessage?.type === "text" && c.lastMessage?.content}
              {c.lastMessage?.type === "post" && "Shared a Post"}{" "}
            </span>
          </div>
        </div>
        {isCalling ? (
          <div className="flex gap-2 justify-center items-center" onClick={()=>{setVideoCall(user.id)}}>
          <button className="btn rounded-full">
            pickup
          </button>
          <button className="btn rounded-full">end</button>
          </div>
        ):(
          <button className="btn rounded-full" onClick={handleCall}>
            <IoIosVideocam />
          </button>
        )}
      </div>
    </div>
  );
};

export default Conversation;
