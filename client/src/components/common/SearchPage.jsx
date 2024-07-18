import React from "react";
import { IoSearch } from "react-icons/io5";
import Account from "./Account";
import Header from "./Header";

const SearchPage = () => {
  return (
    <div className="h-full md:w-full relative md:p-2 overflow-auto lg:overflow-hidden">
      <div className="lg:hidden">
      <Header />
      </div>
      <div className="px-2 w-full h-[90vh]">
        <div className="w-full py-5 border-b h-[15%]">
          <label className="input w-full flex items-center justify-end rounded-full">
            <input type="text" placeholder="Search" className="w-full" />
            <button className="px-2 rounded-full">
              <IoSearch />
            </button>
          </label>
        </div>
        <div className="py-2 lg:h-[82%] h-svh lg:overflow-auto lg:snap-y">
          <span className="text-two text-sm">Suggestions:</span>
          <div>
            <div className="py-4 px-2 lg:px-0 pb-10">
              <Account />
              <Account />
              <Account />
              <Account />
              <Account />
              <Account />
              <Account />
              <Account />
              <Account />

              <Account />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
