import React from "react";
import { FaCircleNotch } from "react-icons/fa";

const ForgetPassword = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div className="flex flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <h1 className="">
            Forget <span className="text-two"> Password</span>
          </h1>
        </div>
        <div className="rounded-3xl flex flex-col justify-center items-center md:w-1/2 w-full p-3 gap-4">
          
          <form className="flex flex-col gap-1 w-2/3">
            <label className="label">Email:</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full"
            />
            <label className="label">OTP:</label>
            <input
              type="text"
              placeholder="******"
              className="input input-bordered w-full"
            />
            <a
              href="#"
              className="text-two text-xs md:text-sm  hover:underline flex gap-1 py-2"
            >
              Let's <span className="text-secondary"> Login</span>
            </a>
            <button className="btn btn-outline lg:text-xl">Send OTP</button>
            <button className="btn lg:text-xl my-3" disabled="true">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
