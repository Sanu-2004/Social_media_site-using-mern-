import React, { useEffect, useState } from "react";
import Message from "./Message";
import { BsSend } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";
import { useConversationContext } from "../../Context/ConversationContext";
import { useMessageContext } from "../../Context/MessageContext";
import { sendMessageHook } from "../../Hooks/SendMessage.hook";
import AddImage from "../common/AddImage";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { set } from "mongoose";

const Messages = () => {
  const { conversation, setConversation } = useConversationContext();
  const { messages, setMessages } = useMessageContext();
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { sendMessage, sendImage } = sendMessageHook();
  const handleSend = () => {
    if (!input && !image) return toast.error("Message can't be empty");
    if (image) {
      sendImage(conversation, image);
    }else{
      sendMessage(conversation, input);
    }
    setInput("");
    setImage(null);
    setPreview(null);
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/message/getmessage/${conversation._id}`);
        const data = await res.json();
        if(data.error){
          setMessages([]);
        }
        setMessages(data);
      } catch (error) {
        true;
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
              src={conversation.members[0].profilePic}
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-xl h-">{conversation.members[0].name}</h1>
          </div>
        </div>
      </div>
      <div className="h-[90vh] flex flex-col justify-end pb-16 md:pb-0">
        {messages.length > 0 ? (
          <div className="w-full p-3 py-1 overflow-auto">
            {messages.map((msg) => (
              <Message key={msg._id} msg={msg} chat={conversation.members[0]} />
            ))}
          </div>
        ) : (
          <p className="w-full text-center py-5">
            Send Message to Start Conversation
          </p>
        )}
        {preview && (
              <div className="flex flex-col items-end  m-3 px-4 relative">
                <p
                  className="absolute top-0 right-4 p-4 text-white text-xl"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  <IoMdClose />
                </p>
                <img src={preview} alt="preview" className="w-full rounded-lg bg-transparent" />
              </div>
            )}
        <div className="p-4 pt-0">
          <label className="input w-full flex items-center justify-end rounded-full">
            
            <input
              type="text"
              placeholder="Type Message"
              className="w-full"
              value={input}
              disabled={image}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <div className="flex gap-2">
              <AddImage setImage={setImage} setPreview={setPreview} />
            <button className="px-2 rounded-full" onClick={handleSend}>
              <BsSend className="text-secondary" />
            </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Messages;
