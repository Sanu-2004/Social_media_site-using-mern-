import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";
import { useUserContext } from "../../Context/UserContext";
import { LikePostHook } from "../../Hooks/LikePost.hook";
import { BiSolidLike } from "react-icons/bi";
import { CommentPostHook } from "../../Hooks/CommentPost.hook";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { user } = useUserContext();
  const [liked, setLiked] = useState(post.likes.includes(user.id));
  const { useLikePost } = LikePostHook();
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const { useCommentPost } = CommentPostHook();

  const likePost = async () => {
    try {
      const p = await useLikePost(post._id);
      if (p.error) {
        return;
      }
      post.likes = p.likes;
      setLiked(!liked);
    } catch (error) {
      console.log("Error in likePost", error);
    }
  };
  const commentPost = async (e) => {
    try {
      e.preventDefault();
      const data = await useCommentPost(post._id, text);
      post.comments = data.comments;
      setText("");
    } catch (error) {
      console.log("Error in commentPost", error);
    }
  };

  return (
    <div className="border-b last:border-0 pb-3">
      <div className="w-full p-6 flex gap-2">
        <img
          src={post.postedBy.profilePic}
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex items-center w-72">
          <div className="flex flex-col justify-start">
            <span className="pl-2 text-lg">{post.postedBy.name}</span>
            <span className="pl-2 text-two text-sm">
              @{post.postedBy.username}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Link to={`/post/${post._id}`}>
        <div className="w-auto h-auto flex flex-col justify-center items-center px-6">
          {post.text && (
            <p className="flex px-2 text-sm w-full">{post.text}</p>
          )}
          {post.image && (
            <img
              src={post.image}
              className="w-full min-h-20 pt-4"
              alt="Image not found"
            />
          )}
          <div className="text-two text-sm w-full px-7 py-2 flex justify-between">
            <p className="flex items-center gap-2">
              <BiLike /> {post.likes.length}
            </p>
            <p className="flex items-center gap-2">
              <FaRegComment /> {post.comments.length}
            </p>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
          </Link>
        <div className="w-full px-3">
          <div className="w-full flex justify-around items-center bg-base-300 text-2xl px-8 py-2 rounded-full cursor-pointer">
            <p onClick={likePost}>{liked ? <BiSolidLike /> : <BiLike />}</p>
            <div className="divider divider-horizontal"></div>
            <FaRegComment
              onClick={() => {
                setActive(!active);
              }}
            />
            <div className="divider divider-horizontal"></div>
            <IoMdShareAlt />
          </div>
          {active && (
            <form className="py-2" onSubmit={commentPost}>
              <label className="flex justify-center gap-2">
                <div className=" border-b w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Comment"
                    className="w-full rounded-2xl bg-transparent px-2 focus:outline-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-outline rounded-full">
                  Comment
                </button>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
