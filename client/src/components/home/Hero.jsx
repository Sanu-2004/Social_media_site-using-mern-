import React, { useEffect, useState } from 'react'
import Header from "../common/Header";
import Post from "../common/Post";
import CreatePost from "./CreatePost";

const Hero = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log({"Hero page": error});
      }finally{
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative md:p-2 overflow-auto">
      <Header />
      <CreatePost />
      <div className="pb-16">
        {
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        }
      </div>
      
    </div>
  )
}

export default Hero
