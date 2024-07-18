import React from 'react'
import { IoIosVideocam } from "react-icons/io";


const Conversation = () => {
  return (
    <div className='snap-center border-b last:border-0'>
      <div className="flex items-center justify-between my-2 p-3">
                <div className="flex gap-3 items-center w-full">
                  <img
                    src="https://picsum.photos/300/300"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2">John Doe</span>
                  <span className="pl-2 text-two text-sm">@jhondoe</span>
                  <span className='pl-2 overflow-hidden h-5 text-sm'>You: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam fuga laboriosam enim dolore. Eum, maiores! Quasi ipsum architecto consequuntur?</span>
                  </div>
                </div>
                <button className="btn rounded-full"><IoIosVideocam /></button>
              </div>
    </div>
  )
}

export default Conversation
