import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    if (details.password !== details.confirmPassword) {
      return toast.error("Password does not match");
    }
    const res = await fetch("/api/user/updatepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: details.password, confirmPassword: details.confirmPassword }),
      credentials: "include",
    });
    const data = await res.json();
    if (data.error) {
      return toast.error(data.error);
    } else {
      toast.success("Password updated successfully");
      navigate("/");
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center md:w-1/2">
        <div className="flex flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <h1 className="">
            <span className="text-two">Create </span>Password
          </h1>
        </div>
        <div className="rounded-3xl flex flex-col justify-center items-center md:w-2/3 w-full p-3 gap-4">
          
          <form className="flex flex-col gap-1 w-full" onSubmit={handleSubmit}>
            <label className="label">New Password:</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
            <label className="label">Confirm Password:</label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={details.confirmPassword}
              onChange={(e) =>
                setDetails({ ...details, confirmPassword: e.target.value })
              }
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
