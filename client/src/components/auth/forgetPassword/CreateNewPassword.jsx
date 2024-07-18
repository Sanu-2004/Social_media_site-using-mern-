import React from "react";
import { FaCircleNotch } from "react-icons/fa";

const CreateNewPassword = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center md:w-1/2">
        <div className="flex flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <h1 className="">
            <span className="text-two">Create </span>Password
          </h1>
        </div>
        <div className="rounded-3xl flex flex-col justify-center items-center md:w-2/3 w-full p-3 gap-4">
          
          <form className="flex flex-col gap-1 w-full">
            <label className="label">New Password:</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <label className="label">Confirm Password:</label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            <button className="btn btn-outline my-4 lg:text-xl">
              Create Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
