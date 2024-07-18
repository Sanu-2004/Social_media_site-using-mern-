import React from 'react'
import { IoMdPhotos } from "react-icons/io";
import { MdAdd } from "react-icons/md";

const CreatePost = () => {
  return (
    <div>
      <div className="border-b pb-4">
        <div className="w-full p-6 flex flex-col md:flex-row justify-between gap-2">
          <img
            src="https://picsum.photos/200/300"
            className="w-[60px] h-[60px] rounded-full hidden md:flex"
          />
          <div className="flex md:hidden items-center w-72">
            <img
              src="https://picsum.photos/200/300"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <span className="pl-2 text-xl">John Doe</span>
              <span className="pl-2 text-two text-md">@jhondoe</span>
            </div>
          </div>
          <div className="border-b md:w-5/6 p-2 mx-2 flex items-end">
            <input
              type="text"
              placeholder="Say Something..."
              className="bg-primary focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4 px-8">
          <IoMdPhotos className="text-2xl" />
          <button className="btn"><MdAdd className="text-2xl" /> Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
