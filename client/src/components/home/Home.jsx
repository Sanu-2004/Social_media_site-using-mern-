import React from "react";
import NavBottom from "./NavBottom";
import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./Hero";
import MessagePage from "../message/MessagePage";
import Profile from "../profile/Profile";
import Search from "../search/Search";
import NavbarSide from "./NavbarSide";
import SearchPage from "../common/SearchPage";
import PostPage from "../postPage/PostPage";
import VideoPage from "../message/VideoPage";
import { useConversationContext } from "../../Context/ConversationContext";

const Home = () => {
  const { videoCall } = useConversationContext();

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
        <Route
          path="/video/:id"
          element={ videoCall ? <VideoPage /> : <Navigate to="/message" />}
        />
      </Routes>
      <div className="hidden lg:flex h-[90vh] w-1/4 border-l">
        <SearchPage />
      </div>
      <NavBottom />
    </>
  );
};

export default Home;
