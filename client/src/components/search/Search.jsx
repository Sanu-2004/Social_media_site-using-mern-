import React from "react";
import SearchPage from "../common/SearchPage";
import Home from "../home/Home";

const Search = () => {
  return (
    <div className="h-svh lg:w-1/3 md:w-2/3 w-full relative md:p-2">
      <div className="lg:hidden">
        <SearchPage />
      </div>
      <div className="hidden lg:flex w-svh">
        <Home />
      </div>
    </div>
  );
};

export default Search;
