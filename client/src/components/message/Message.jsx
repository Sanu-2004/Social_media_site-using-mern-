import React from 'react'

const Message = ({chat}) => {
  return (
    <div className={`w-full`}>
    <div className={`w-full flex items-center p-2 justify-${chat}`}>
      <div className='bg-base-300 p-4 rounded-2xl flex flex-wrap w-3/4'>
        hello gusy Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dignissimos quaerat provident eligendi, delectus et exercitationem sed quasi, explicabo impedit eaque cum?
      </div>
    </div>
    </div>
  )
}

export default Message
