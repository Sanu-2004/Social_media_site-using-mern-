import React from "react";
import Conversations from "./Conversations";
import Messages from "./Messages";
import { useConversationContext } from "../../Context/ConversationContext";

const MessagePage = () => {
  const { conversation } = useConversationContext();
  return (
    <>
      <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative ">
        {conversation ? (
          <div className="h-full md:p-2">
            <Messages />
          </div>
        ) : (
          <div className="w-full md:p-2">
            <Conversations />
          </div>
        )}
      </div>
    </>
  );
};

export default MessagePage;
