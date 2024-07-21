import React, { useEffect, useState } from "react";
import Message from "./Message";
import { BsSend } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";
import { useConversationContext } from "../../Context/ConversationContext";

const Messages = () => {
  const { conversation, setConversation, setMessages, messages } =
    useConversationContext();
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    try {
      const res = await fetch(`/api/message/sendmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          receiverId: conversation.id,
          type: "text",
        }),
        credentials: "include",
      });
      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.log("Error in sendMessage", error);
    }
  };
  useEffect(() => {
    const getMessages = async () => {
      try{
        const res = await fetch(`/api/message/getmessage/${conversation.cId}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.log("Error in getMessages")
      }
    };
    getMessages();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="h-[10vh] bg-base-200">
        <div className="h-full flex flex-row gap-3 justify-start px-4 items-center text-secondary">
          <div className="flex gap-2 justify-center items-center p-1">
            <button
              className="btn rounded-full"
              onClick={() => {
                setConversation(null);
              }}
            >
              <IoArrowBackOutline />
            </button>
            <img
              src={conversation.profilePic}
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-xl h-">{conversation.name}</h1>
          </div>
        </div>
      </div>
      <div className="h-[90vh] flex flex-col justify-end pb-16 md:pb-0">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div className="w-full p-3 py-1 overflow-auto" key={msg._id}>
              <Message msg={msg} conversation={conversation} />
            </div>
          ))
        ) : (<p className="w-full text-center py-5">Send Message to Start Conversation</p>)}

        <div className="p-4 pt-0">
          <label className="input w-full flex items-center justify-end rounded-full">
            <input type="text" placeholder="Type Message" className="w-full" value={input} onChange={(e)=>{setInput(e.target.value)}} />
            <button className="px-2 rounded-full" onClick={sendMessage}>
              <BsSend />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Messages;
