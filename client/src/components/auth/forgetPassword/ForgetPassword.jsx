import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ForgetPasswordHook } from "../../../Hooks/ForgetPasswordHook";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { SendOTP, VerifyOtp } = ForgetPasswordHook();


  const handleSendOTP = async (e) => {
    e.preventDefault();
    const success = SendOTP(email);
    setSent(success);
  };


  const handleVerify = async (e) => {
    e.preventDefault();
    VerifyOtp(email, otp);
  }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sent}
            />
            <label className="label">OTP:</label>
            <input
              type="text"
              placeholder="******"
              className="input input-bordered w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={!sent}
            />
            <Link
              to="/login"
              className="text-two text-xs md:text-sm  hover:underline flex gap-1 py-2"
            >
              Let's <span className="text-secondary"> Login</span>
            </Link>
            <button className="btn btn-outline lg:text-xl" disabled={sent} onClick={handleSendOTP}>Send OTP</button>
            <button className="btn lg:text-xl my-3" disabled={!sent} onClick={handleVerify}>
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
