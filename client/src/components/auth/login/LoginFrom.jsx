import React, { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LoginHook } from "../../../Hooks/Login.hook";

const LoginFrom = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const{loading, useLogin} = LoginHook();

  const handleSubmit = (e) => {
    e.preventDefault();
    useLogin(details);
  }
  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center w-full">
      <div className="flex md:hidden flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <FaCircleNotch className="text-two" />
          <h1 className="font-bold "> Circle</h1>
        </div>
        <div className="md:flex hidden flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <h1 className="font-bold "> Log<span className="text-two">in</span></h1>
        </div>
        <div className="rounded-3xl flex flex-col justify-center items-center md:w-3/4 w-full p-3 gap-4">
          
          <form className="flex flex-col gap-1 w-2/3" onSubmit={handleSubmit}>
            <label className="label">Username:</label>
            <input
              type="text"
              placeholder="JhonDoe"
              className="input input-bordered w-full"
              value={details.username}
              onChange={(e) =>setDetails({ ...details, username: e.target.value })}
            />
            <label className="label">Password:</label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={details.password}
              onChange={(e) =>setDetails({ ...details, password: e.target.value })}
            />
            <Link to="/signup" className="text-two text-xs md:text-sm  hover:underline flex gap-1 py-2">
                dont have an account? <span className="text-secondary">Sign up</span>
            </Link>
            <button className="btn btn-outline text-md md:text-xl" type="submit">
            {loading? (<span className="loading loading-spinner loading-md"></span>) : "Login"}
            </button>
            <Link to="/forget-password"  className="btn text-xs md:text-sm my-3">
                <span>Forget Password?</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
