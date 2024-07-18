import React from 'react'
import Conversations from './Conversations'
import Messages from './Messages'

const MessagePage = () => {
  return (
    <>
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative ">


    <div className='w-full md:p-2'>
    <Conversations />
    </div>


    {/* <div className='h-full md:p-2'>
    <Messages />
    </div> */}
    </div>
    </>
  )
}

export default MessagePage
