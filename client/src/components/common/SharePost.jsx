import React, { useEffect, useState } from "react";
import { getConversationsHook } from "../../Hooks/GetConversatons.hook";
import { useConversationContext } from "../../Context/ConversationContext";
import SharePostAccount from "./SharePostAccount";

const SharePost = ({post}) => {
  const { allConversations } = useConversationContext();
  const { useGetConversations } = getConversationsHook();

  useEffect(() => {
    const fetchConversations = async () => {
      if (allConversations.length === 0) {
        useGetConversations();
      }
    };
    fetchConversations();
  }, []);
  return (
    <>
      <div className="p-4">
        <div className=" max-h-60 overflow-auto bg-base-100 rounded-3xl">
        <div className="p-2 flex flex-col justify-center items-center min-h-20">
          {allConversations.length === 0 && (
            <p className="text-center">No Conversations Found</p>
          )}
          {allConversations &&
            allConversations.map((c) => (
              <SharePostAccount key={c._id} c={c} postId={post._id} />
            ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default SharePost;
