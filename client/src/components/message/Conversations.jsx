import React, { useEffect, useMemo, useState } from "react";
import Conversation from "./Conversation";
import { IoSearch } from "react-icons/io5";
import NewConversation from "./NewConversation";
import { SearchConversationHook } from "../../Hooks/searchConversation.hook";
import { useConversationContext } from "../../Context/ConversationContext";

const Conversations = () => {
  const [search, setSearch] = useState("");
  const {users, searchConvertationUser} = SearchConversationHook();
  const {allConversations} = useConversationContext();

  useEffect(() => {
   searchConvertationUser(search);
  }, [search]);


  return (
    <div>
      <div className="h-[8vh] bg-base-200">
        <div className="h-full flex flex-row gap-3 justify-center items-center lg:text-3xl text-2xl text-secondary">
          <h1 className="font-bold ">Messages</h1>
        </div>
      </div>
      <div className="w-full px-5 h-[90vh] overflow-auto snap-y">
        <div className="py-5">
          <label className="input w-full flex items-center justify-end rounded-full">
            <input
              type="text"
              placeholder="Conversations"
              className="w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="px-2 rounded-full">
              <IoSearch />
            </button>
          </label>
        </div>
        {search.length > 0 ? (
          <div>
            {users.length === 0 && (
              <p className="text-center">
                You must be Linked with this user to start Conversation
              </p>
            )}
            {users.map((user) => (
              <NewConversation key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div>
            {allConversations?.length === 0 && (
              <p className="text-center">No Conversations Found</p>
            )}
            {allConversations &&
              allConversations.map((c) => (
                <Conversation
                  key={c._id}
                  c={c}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
