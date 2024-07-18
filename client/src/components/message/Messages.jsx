import React from "react";
import Message from "./Message";
import { BsSend } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";

const Messages = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[10vh] bg-base-200">
        <div className="h-full flex flex-row gap-3 justify-start px-4 items-center text-secondary">
        <div className="flex gap-2 justify-center items-center p-1">
            <button className="btn rounded-full">
              <IoArrowBackOutline />
            </button>
          <img src="https://picsum.photos/300/300" className="w-12 h-12 rounded-full" />
          <h1 className="text-xl h-">Jhon Doe</h1>
          </div>
        </div>
      </div>
      <div className="h-[90vh] flex flex-col justify-end">
      <div className="w-full p-3 overflow-auto">
        <Message chat={"start"} />
        <Message chat={"end"} />
        <Message chat={"start"} />
        <Message chat={"end"} />
        <Message chat={"start"} />
        <Message chat={"end"} />
      </div>
      <div className="p-4 pt-0">
        <label className="input w-full flex items-center justify-end rounded-full">
          <input type="text" placeholder="Type Message" className="w-full" />
          <button className="px-2 rounded-full">
            <BsSend />
          </button>
        </label>
      </div>
      </div>
    </div>
  );
};

export default Messages;
