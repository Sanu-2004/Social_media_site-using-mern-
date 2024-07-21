import React from 'react'
import { useUserContext } from '../../Context/UserContext';

const Message = ({msg}) => {
  const {user} = useUserContext();
  return (
    <div className={`w-full`}>
    <div className={`w-full flex items-center p-2 justify-${user.id===msg.sender?"end":"start"}`}>
      <div className='bg-base-300 p-4 rounded-2xl flex flex-wrap max-w-3/4'>
        {msg.content}
        </div>
    </div>
    </div>
  )
}

export default Message
