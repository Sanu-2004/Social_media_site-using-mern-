import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import Post from "../common/Post";
import { GetPostHook } from "../../Hooks/GetPost.hook";

const Message = ({ msg }) => {
  const { user } = useUserContext();
  const [post, setPost] = useState(null);
  const {useGetPost} = GetPostHook();
  const m = useRef(null)
  useEffect(() => {
    m.current.scrollIntoView({ behavior: "smooth" });
    if(msg.type === "post") {
      const fetchPost = async () => {
        const p = await useGetPost(msg.content);
        setPost(p);
      };
      fetchPost();
    }
  }, [msg])
  return (
    <div className={`w-full`} ref={m}>
      <div
        className={`w-full flex items-center p-2 justify-${
          user.id === msg.sender ? "end" : "start"
        }`}
      >
        <div className="max-w-[80%]">
          {msg.type === "image" && (
            <img src={msg.content} className="rounded-3xl" />
          ) }
          {msg.type === "text" && (
            <div className="bg-base-300 p-4 rounded-2xl flex flex-wrap w-fit">
              {msg.content}
            </div>
          )}
          {msg.type === "post" && (
            <div className="bg-base-300 rounded-3xl">
            <Post post={post} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
