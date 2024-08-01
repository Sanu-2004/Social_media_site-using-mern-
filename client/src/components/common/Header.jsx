import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useThemeContext } from "../../Context/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <div className="w-full">
      <div className="h-[8vh] bg-base-200">
        <div className="h-full flex flex-row justify-center items-center lg:text-3xl text-2xl text-secondary">
          <button
            className="btn btn-ghost rounded-full text-2xl p-3"
            onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          >
            <FaCircleNotch className="text-two" />
          </button>
          <h1 className="font-bold "> Circle</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
