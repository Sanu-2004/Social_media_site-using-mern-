import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

const NavBottom = () => {
  const { user } = useUserContext();
  return (
    <div>
      <div className="md:hidden w-full p-2 fixed bottom-0">
        <ul className="menu menu-horizontal bg-base-200 w-full flex justify-around rounded-box mt-6  text-2xl">
          <li>
            <NavLink to="/">
              <IoHomeOutline />
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <IoSearch />
            </NavLink>
          </li>
          <li>
            <NavLink to="/message">
              <FaRegMessage />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile`}>
              <CgProfile />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBottom;
