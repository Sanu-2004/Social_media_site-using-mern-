import React from "react";
import NavBottom from "../home/NavBottom";
import Header from "../common/Header";
import Post from "../common/Post";
import Account from "../common/Account";

const Profile = () => {
  return (
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative md:p-2  overflow-auto">
      <Header />
      <div>
        <div className="flex justify-between items-center p-4">
          <div className="w-1/2">
            <img
              src="https://picsum.photos/300/300"
              alt="profile"
              className="w-28 h-28 rounded-full"
            />
            <div className="px-4 py-1">
            <h2 className="text-lg">John Doe</h2>
            <p className="text-two">@johndoe</p>
            </div>
          </div>
            <div className="w-1/2 flex justify-center items-center p-2">
          <div className="stat place-items-center w-1/2">
            <div className="stat-title">Posts</div>
            <div className="stat-value">5</div>
          </div>
          <div className="stat place-items-center w-1/2">
            <div className="stat-title">Linkers</div>
            <div className="stat-value">2</div>
            </div>
          </div>
        </div>
        <div className="px-6 w-5/6">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
            nam voluptas blanditiis eum? Numquam voluptatibus quis ad impedit,
            soluta repudiandae! Aspernatur praesentium minus hic nesciunt
            recusandae, nam, mollitia laborum rem incidunt, eveniet deleniti?
          </p>
        </div>
        <div className="px-6 py-2 w-5/6 underline hover:text-blue-600">
          <a href="#">
            Lorem, ipsum dolor sit amet consectetur 
          </a>
        </div>
        <div className="w-full p-2 flex justify-end">
          <button className="btn btn-outline rounded-full">Edit Profile</button>
        </div>
        <div className="flex w-full justify-around py-2">
            <span className="text-lg px-6 underline">Posts</span>
            <span className="text-lg px-6">Linkers</span>
        </div>
        <div>
            {/* <Post />
            <Post />
            <Post /> */}
            <div className="py-2 px-4">
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
  );
};

export default Profile;
