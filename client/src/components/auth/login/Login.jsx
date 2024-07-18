import React, { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import LoginFrom from "./LoginFrom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="hidden md:flex flex-col p-6 w-1/2 h-1/2 justify-center gap-3 items-center">
        <div className="flex flex-row gap-3 justify-start items-center text-6xl text-secondary w-2/3">
          <FaCircleNotch className="text-gray-500 text-5xl" />
          <h1 className="font-bold "> Circle</h1>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center text-6xl text-secondary w-2/3">
          <h1 className="font-bold">
            <span className="text-gray-500">Welcome</span> Back,
          </h1>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        <LoginFrom />
      </div>
    </div>
  );
};

export default Login;
