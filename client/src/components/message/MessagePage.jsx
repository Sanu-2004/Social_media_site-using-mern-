import React, { useEffect } from "react";
import Conversations from "./Conversations";
import Messages from "./Messages";
import { useConversationContext } from "../../Context/ConversationContext";
import { getConversationsHook } from "../../Hooks/GetConversatons.hook";
import VideoPage from "./VideoPage";

const MessagePage = () => {
  const { conversation, videoCall } = useConversationContext();
  const { useGetConversations } = getConversationsHook();
  useEffect(() => {
    useGetConversations();
  }, [conversation]);
  return (
    <>
      <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative ">
        {conversation && !videoCall && (
          <div className="h-full md:p-2">
            <Messages />
          </div>
        )}
        {!conversation && !videoCall && (
          <div className="w-full md:p-2">
            <Conversations />
          </div>
        )}
      </div>
    </>
  );
};

export default MessagePage;
