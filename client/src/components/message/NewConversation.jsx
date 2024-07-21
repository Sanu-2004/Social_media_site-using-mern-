import React from 'react'
import { useConversationContext } from '../../Context/ConversationContext'

const NewConversation = ({user}) => {
  const {setConversation} = useConversationContext()
  const conv={}
  conv.members=[user]
  conv._id=user._id
  return (
    <div className='snap-center border-b last:border-0'>
      <div className="flex items-center justify-between my-2 p-3" onClick={()=>{setConversation(conv)}}>
                <div className="flex gap-3 items-center w-full">
                  <img
                    src={user.profilePic}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2">{user.name}</span>
                  <span className="pl-2 text-two text-sm">@{user.username}</span>
                  </div>
                </div>
                </div>
    </div>
  )
}

export default NewConversation
