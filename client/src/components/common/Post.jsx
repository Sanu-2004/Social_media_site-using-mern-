import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";

const Post = () => {
  return (
    <div className="border-b last:border-0 pb-3">
      <div className="w-full p-6 flex gap-2">
        <img
          src="https://picsum.photos/200/300"
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex items-center w-72">
          <div className="flex flex-col justify-start">
            <span className="pl-2 text-lg">John Doe</span>
            <span className="pl-2 text-two text-sm">@jhondoe</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="flex px-4 text-sm w-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          totam quisquam nam?
        </p>
        <img src="https://picsum.photos/200/300" className="w-5/6 p-4" />
        <p className="text-two text-sm w-full px-5 pb-2">Date: 32/29</p>
        <div className="w-full px-3">
        <div className="w-full flex justify-around items-center bg-base-300 text-2xl px-8 py-2 rounded-full">
            <BiLike />
            <div className="divider divider-horizontal"></div>
            <FaRegComment />
            <div className="divider divider-horizontal"></div>
            <IoMdShareAlt />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
