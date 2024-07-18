import React from "react";
import Conversation from "./Conversation";
import { IoSearch } from "react-icons/io5";

const Conversations = () => {
  return (
    <div>
      <div className='h-[8vh] bg-base-200'>
        <div className="h-full flex flex-row gap-3 justify-center items-center lg:text-3xl text-2xl text-secondary">
          <h1 className="font-bold ">Messages</h1>
        </div>
    </div>
      <div className="w-full px-5 h-[90vh] overflow-auto snap-y">
        <div className="py-5">
          <label className="input w-full flex items-center justify-end rounded-full">
            <input type="text" placeholder="Conversations" className="w-full" />
            <button className="px-2 rounded-full">
              <IoSearch />
            </button>
          </label>
        </div>
        <div className="">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        </div>
      </div>
    </div>
  );
};

export default Conversations;
