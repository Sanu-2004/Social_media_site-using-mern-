import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { sendMessageHook } from "../../Hooks/SendMessage.hook";

const SharePostAccount = ({ c, postId }) => {
  const [shared, setShared] = useState(false);
  const { sendPost } = sendMessageHook();
  const handleShare = () => {
    sendPost(c.members[0]._id, postId);
    setShared(true);
  };
  return (
    <div className="snap-center w-full border-b last:border-0">
      <div className="flex items-center justify-between my-2 p-3">
        <div className="flex gap-3 items-center w-full">
          <img
            src={c.members[0].profilePic}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="pl-2">{c.members[0].name}</span>
            <span className="pl-2 text-two text-sm">
              @{c.members[0].username}
            </span>
          </div>
        </div>
        <div>
          {shared ? (
            <p className="text-2xl p-3">
              <MdDone />
            </p>
          ) : (
            <button
              className="btn btn-outline rounded-full"
              onClick={handleShare}
            >
              <IoSend />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharePostAccount;
