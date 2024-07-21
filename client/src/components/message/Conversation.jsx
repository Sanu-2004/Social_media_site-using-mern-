import React, { useEffect, useState } from 'react'
import { IoIosVideocam } from "react-icons/io";
import { useConversationContext } from '../../Context/ConversationContext';
;


const Conversation = ({c}) => {
  const {setConversation} = useConversationContext()
  
  const handleClick = () => {
    setConversation(c)
  }
  return (
    <div className='snap-center border-b last:border-0'>
      <div className="flex items-center justify-between my-2 p-3">
                <div className="flex gap-3 items-center w-full cursor-pointer" onClick={handleClick}>
                  <img
                    src={c.members[0].profilePic}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2">{c.members[0].name}</span>
                  <span className="pl-2 text-two text-sm">@{c.members[0].username}</span>
                  <span className='pl-2 overflow-hidden h-5 text-sm'>{c.lastMessage?.sender === c.members[0]._id? (c.members[0].name.split(" ")[0]):"you"}: {" "}
                    {c.lastMessage?.type === "image" && "Shared a Image"}
                    {c.lastMessage?.type === "text" && c.lastMessage?.content}
                    {c.lastMessage?.type === "post" && "Shared a Post"} </span>
                  </div>
                </div>
                <button className="btn rounded-full"><IoIosVideocam /></button>
              </div>
    </div>
  )
}

export default Conversation
