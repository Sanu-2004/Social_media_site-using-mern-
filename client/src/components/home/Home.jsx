import React from "react";
import NavBottom from "./NavBottom";
import { Route, Routes } from "react-router-dom";
import Hero from "./Hero";
import MessagePage from "../message/MessagePage";
import Profile from "../profile/Profile";
import Search from "../search/Search";
import NavbarSide from "./NavbarSide";
import SearchPage from "../common/SearchPage";
import PostPage from "../postPage/PostPage";

const Home = () => {
  return (
    <>
      <NavbarSide />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
      <div className="hidden lg:flex h-[90vh] w-1/4 border-l">
        <SearchPage />
      </div>
      <NavBottom />
    </>
  );
};

export default Home;
