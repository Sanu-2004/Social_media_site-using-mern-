import React from 'react'
import SignupFrom from './SignupFrom'


const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
        <div className="hidden md:flex flex-col p-6 w-1/2 h-1/2 justify-center gap-3 items-center">
            <div className="flex flex-row gap-3 justify-start items-center text-6xl text-secondary w-2/3">
            <h1 className="font-bold"><span className="text-gray-500">Get</span> Started,</h1>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center text-4xl text-secondary w-2/3">
            <h1 className="">No <span className="text-gray-500 font-bold">Ads</span></h1>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center text-4xl text-secondary w-2/3">
            <h1 className="font-bold">Full <span className="text-gray-500 font-normal">Privacy</span></h1>
            </div>
        </div>
        <div className="lg:w-1/2 w-full">
        <SignupFrom />

        </div>

    </div>
  )
}

export default Signup
