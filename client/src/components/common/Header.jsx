import React from 'react'
import { FaCircleNotch } from "react-icons/fa";


const Header = () => {
  return (
    <div className='w-full'>
    <div className='h-[8vh] bg-base-200'>
        <div className="h-full flex flex-row gap-3 justify-center items-center lg:text-3xl text-2xl text-secondary">
          <FaCircleNotch className="text-two" />
          <h1 className="font-bold "> Circle</h1>
        </div>
    </div>
    </div>
  )
}

export default Header
