import React, { useState } from "react";
import { LikeUserHook } from "../../Hooks/LinkUser.hook";
import { set } from "mongoose";
import { Link } from "react-router-dom";

const Account = ({ user, linked = false, showLink = true }) => {
  const { useLikeUser } = LikeUserHook();
  const [isLinked, setIsLinked] = useState(linked);

  const handleLink = async () => {
    await useLikeUser(user._id);
    setIsLinked(!isLinked);
  };

  return (
    <div className="snap-center lg:py-0 py-1">
      <div className="flex items-center bg-base-300 justify-between my-2 p-3 rounded-full">
        <Link to={`/profile/${user.username}`} className="flex items-center w-full">
          <img src={user.profilePic} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <span className="pl-2">{user.name}</span>
            <span className="pl-2 text-two text-sm">@{user.username}</span>
          </div>
        </Link>
        {showLink ? (
          <button className="btn rounded-full" onClick={handleLink}>
            {isLinked ? "Linked" : "Link"}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Account;
