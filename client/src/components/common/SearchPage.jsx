import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Account from "./Account";
import Header from "./Header";
import { UserSuggestionsHook } from "../../Hooks/UserSuggestion.hook";
import { searchUserHook } from "../../Hooks/SearchUser.hook";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const { useUserSuggestions } = UserSuggestionsHook();
  const [suggestions, setSuggestions] = useState([]);
  const [searched, setSearched] = useState([]);
  const { useSearchUser } = searchUserHook();

  const searchUser = async () => {
    const data = await useSearchUser(search);
    setSearched(data);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const data = await useUserSuggestions();
      setSuggestions(data);
      searchUser();
    };
    fetchSuggestions();
  }, [search]);


  return (
    <div className="h-full md:w-full relative md:p-2 overflow-auto lg:overflow-hidden">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="px-2 w-full h-[90vh]">
        <div className="w-full py-5 border-b h-[15%]">
          <label className="input w-full flex items-center justify-end rounded-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-2 rounded-full" onClick={searchUser}>
              <IoSearch />
            </button>
          </label>
        </div>
        <div className="py-2 lg:h-[82%] h-svh lg:overflow-auto lg:snap-y">
          {search.length > 0 ? (
            <div>
              <span className="text-two text-sm">Result : {searched.length}</span>
              <div>
                <div className="py-4 px-2 lg:px-0 pb-10">
                  {searched.length === 0 && (<p className="w-full flex justify-center">No Result Found</p>)}
                  {searched.map((user) => (
                    <Account key={user._id} user={user} linked={user.linked} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-two text-sm">Suggestions:</span>
              <div>
                <div className="py-4 px-2 lg:px-0 pb-10">
                  {suggestions.map((suggestion) => (
                    <Account key={suggestion._id} user={suggestion} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
