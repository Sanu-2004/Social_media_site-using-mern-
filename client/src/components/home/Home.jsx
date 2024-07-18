import React from "react";
import Header from "../common/Header";
import NavBottom from "./NavBottom";
import Post from "../common/Post";
import CreatePost from "./CreatePost";

const Home = () => {
  return (
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative md:p-2 overflow-auto">
      <Header />
      <CreatePost />
      <div className="pb-16">
        <Post />
        <Post />
      </div>
      
    </div>
  );
};

export default Home;
