import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const {user}=useUserContext();
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if(user){
            const newSocket = io(`http://localhost:8000`,{
                query:{
                    userId:user.id
                }
            })
            setSocket(newSocket);
            newSocket.on("online", (data)=>{
                setOnlineUsers(data);
            });
            return ()=>{
                newSocket.close();
            }
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
        </SocketContext.Provider>
    );
};