import React, { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupFrom = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
  }

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div className="flex flex-row gap-3 justify-center items-center text-4xl text-secondary">
          <FaCircleNotch className="text-two" />
          <h1 className="font-bold "> Circle</h1>
        </div>
        <div className="rounded-3xl flex flex-col justify-center items-center md:w-3/4 w-full p-3 gap-4">
          <form className="flex flex-col w-2/3 mb-3">
            <label className="label">Full Name:</label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className="input input-bordered w-full"
              value={details.fullName}
              onChange={(e) =>
                setDetails({ ...details, fullName: e.target.value })
              }
            />
            <label className="label">Email:</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <label className="label">Username:</label>
            <input
              type="text"
              placeholder="JhonDoe"
              className="input input-bordered w-full"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
            />
            <label className="label">Password:</label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
            <label className="label">Confirm Password:</label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={details.confirmPassword}
              onChange={(e) =>
                setDetails({ ...details, confirmPassword: e.target.value })
              }
            />
            <Link
              to="/login"
              className="text-two text-xs md:text-sm  hover:underline flex gap-1 py-2"
            >
              Already have an account.
              <span className="text-secondary"> Login</span>
            </Link>
            <button className="btn btn-outline lg:text-xl" onClick={handleSubmit}>Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupFrom;
