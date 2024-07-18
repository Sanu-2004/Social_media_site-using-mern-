import React from "react";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { RiMessage3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-screen py-[5vh] lg:w-1/4">
        <div className="h-full hidden md:flex flex-col p-2 border-r">
          <div className="h-1/6 border-b flex flex-row w-full">
          <div className="flex items-center justify-between my-2 p-3 rounded-full">
                <div className="flex items-center w-72">
                  <img
                    src="https://picsum.photos/200/300"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2 text-xl">John Doe</span>
                  <span className="pl-2 text-two text-md">@jhondoe</span>
                  </div>
                </div>
              </div>
          </div>

          <div className="flex h-5/6 flex-col justify-between">
            <ul className="menu text-xl w-full p-4">
              <li>
                <NavLink to="/">
                  <HiHome />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <CgProfile />
                  Profile
                </NavLink>
              </li>
              <li className="lg:hidden flex">
                <NavLink to="/search">
                  <IoSearch />
                  search
                </NavLink>
              </li>
              <li>
                <NavLink to="message">
                  <RiMessage3Fill />
                  Messages
                </NavLink>
              </li>
            </ul>
            <div className="text-md px-4 py-3">
              <button className="btn w-full">
                <BiLogOutCircle className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
