import toast from "react-hot-toast";
import { useMessageContext } from "../Context/MessageContext";

export const sendMessageHook = () => {
    const  { messages, setMessages } = useMessageContext();
    const sendMessage = async (conversation, input) => {
        try {
          const res = await fetch(`/api/message/sendmessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: input,
              receiverId: conversation.members[0]._id,
              type: "text",
            }),
            credentials: "include",
          });
          const data = await res.json();
          setMessages([...messages, data]);
          return true;
        } catch (error) {
          console.log("Error in sendMessage", error);
        }
      };
      const sendImage = async (conversation, image) => {
        try {
            if (!image || !conversation.members[0]._id) {
                return toast.error("Please provide all fields");
            }
          const res = await fetch(`/api/message/sendimage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: image,
                type: "image",
                receiverId: conversation.members[0]._id,
            }),
            credentials: "include",
          });
          const data = await res.json();
          if(data.error){
            toast.error(data.error);
            return false;
          }
          setMessages([...messages, data]);
          return true;
        } catch (error) {
          console.log("Error in sendImage", error);
        }
      };
      const sendPost = async (receiverId, postId) => {
        try {
            if (!postId || !receiverId) {
                return toast.error("Please provide all fields");
            }
          const res = await fetch(`/api/message/sendmessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: postId,
                type: "post",
                receiverId
            }),
            credentials: "include",
          });
          const data = await res.json();
          if(data.error){
            toast.error(data.error);
            return false;
          }
          setMessages([...messages, data]);
          return true;
        } catch (error) {
          console.log("Error in sendPost", error);
        }
      };
        return { sendMessage, sendImage, sendPost };
};