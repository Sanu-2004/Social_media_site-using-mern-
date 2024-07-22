import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import { useMessageContext } from "../Context/MessageContext";


const GetNewMessageHook = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useMessageContext()
    useEffect(()=>{
        if(socket){
            socket.on("newMessage", (data)=>{
                setMessages([...messages, data])
            })
            return ()=>{
                socket.off("newMessage")
            }
        }
    },[socket,, messages, setMessages])
};

export default GetNewMessageHook;