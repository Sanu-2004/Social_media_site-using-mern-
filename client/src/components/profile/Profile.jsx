import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Post from "../common/Post";
import Account from "../common/Account";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { LikeUserHook } from "../../Hooks/LinkUser.hook";
import UpdateProfile from "./UpdateProfile";
import { LogoutHook } from "../../Hooks/Logout.hook";
import { BiLogOutCircle } from "react-icons/bi";

const Profile = () => {
  const [postActive, setPostActive] = useState("post");
  const { loading, useLogout } = LogoutHook();
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const { user } = useUserContext();
  const { useLikeUser } = LikeUserHook();
  const [isLinked, setIsLinked] = useState(false);

  const handleLink = async () => {
    await useLikeUser(profile?._id);
    setIsLinked(!isLinked);
  };

  useEffect(() => {
    const fetchPoifle = async () => {
      try {
        if (username) {
          const res = await fetch(`/api/user/profile/${username}`, {
            credentials: "include",
          });
          const data = await res.json();
          setProfile(data);
          setIsLinked(data.linkers.some((linker) => linker._id === user.id));
          // console.log(data.linkers, user.id); 
        } else {
          const res = await fetch(`/api/user/profile/${user.username}`, {
            credentials: "include",
          });
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPoifle();
    // console.log(isLinked);
  }, [username, user]);
  return (
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative md:p-2  overflow-auto">
      <Header />
      {profile && (
        <div>
          <div className="flex justify-between items-center p-4">
            <div className="w-1/2">
              <img
                src={profile.profilePic}
                alt="profile"
                className="w-28 h-28 rounded-full"
              />
              <div className="px-4 py-1">
                <h2 className="text-lg">{profile.name}</h2>
                <p className="text-two">@{profile.username}</p>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center p-2">
              <div className="stat place-items-center w-1/2">
                <div className="stat-title">Posts</div>
                <div className="stat-value">{profile.posts.length}</div>
              </div>
              <div className="stat place-items-center w-1/2">
                <div className="stat-title">Linkers</div>
                <div className="stat-value">{profile.linkers.length}</div>
              </div>
            </div>
          </div>
          <div className="px-6 w-5/6">
            <p>{profile.bio}</p>
          </div>
          <div className="px-6 py-2 w-5/6 underline hover:text-blue-600">
            <a href={profile.link} target="blank">
              {profile.link}
            </a>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <UpdateProfile profile={profile} />
              <div className="modal-action w-full">
                <form method="dialog" className="w-full p-x2">
                  <button className="btn w-full">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="w-full p-2 flex justify-end">
            {user.username === profile.username ? (
              <div className="flex items-center gap-3">
                <button
                  className="btn btn-secondary rounded-full md:hidden"
                  onClick={useLogout}
                >
                  {loading ? (
                    <div className="loading loading-spinner"></div>
                  ) : (
                    <BiLogOutCircle className="text-lg" />
                  )}
                </button>
                <button
                  className="btn btn-outline rounded-full"
                  onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <button
                className="btn bg-secondary text-primary hover:text-secondary rounded-full"
                onClick={handleLink}
              >
                {isLinked ? "Linked" : "Link"}
              </button>
            )}
          </div>

          <div className="flex w-full justify-around py-2">
            <span
              className={`text-lg px-6 cursor-pointer hover:underline ${
                postActive === "post" && "underline"
              }`}
              onClick={() => {
                setPostActive("post");
              }}
            >
              Posts
            </span>
            <span
              className={`text-lg px-6 cursor-pointer hover:underline ${
                postActive === "linkers" && "underline"
              }`}
              onClick={() => {
                setPostActive("linkers");
              }}
            >
              Linkers
            </span>
          </div>

          <div className="pb-12">
            {postActive === "post" ? (
              <div className="py-2 px-4">
                {profile.posts.length === 0 && (
                  <p className="w-full flex justify-center">No Post Found</p>
                )}
                {profile.posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-2 px-4">
                {profile.linkers.length === 0 && (
                  <p className="w-full flex justify-center">No Linker Found</p>
                )}
                {profile.linkers.map((linker) => (
                  <Account key={linker._id} user={linker} showLink={false} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
