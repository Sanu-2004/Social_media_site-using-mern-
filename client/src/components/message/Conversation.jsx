import React, { useEffect, useState } from 'react'
import { IoIosVideocam } from "react-icons/io";
import { useConversationContext } from '../../Context/ConversationContext';
;


const Conversation = ({u}) => {
  const [lastmsg, setLastmsg] = useState([]);
  const {setConversation} = useConversationContext()
  useEffect(() => {
    const getLastMsg = async () => {
      try {
        const res = await fetch(`/api/message/getconversation?friend=${u._id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setLastmsg(data);
      } catch (error) {
        console.log("Error in getLastMsg", error);
      }
    };
    getLastMsg();
  }, [u])
  const handleClick = () => {
    setConversation({id: u._id, name: u.name, profilePic: u.profilePic, username: u.username, cId: lastmsg._id})
  }
  return (
    <div className='snap-center border-b last:border-0'>
      <div className="flex items-center justify-between my-2 p-3">
                <div className="flex gap-3 items-center w-full" onClick={handleClick}>
                  <img
                    src={u.profilePic}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2">{u.name}</span>
                  <span className="pl-2 text-two text-sm">@{u.username}</span>
                  <span className='pl-2 overflow-hidden h-5 text-sm'>{lastmsg.lastMessage?.sender === u._id? (u.name.split(" ")[0]):"you"}: {lastmsg.lastMessage?.content} </span>
                  </div>
                </div>
                <button className="btn rounded-full"><IoIosVideocam /></button>
              </div>
    </div>
  )
}

export default Conversation
