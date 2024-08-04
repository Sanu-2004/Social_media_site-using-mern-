import React, { useEffect, useState } from "react";
import Post from "../common/Post";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { GetPostHook } from "../../Hooks/GetPost.hook";
import { DeleteCommentHook } from "../../Hooks/DeleteComment.hook";
import toast from "react-hot-toast";

const PostPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { useGetPost, loading } = GetPostHook();
  const { useDeleteComment, deleteLoading } = DeleteCommentHook();

  const deleteComment = async (cId) => {
    const newPost = await useDeleteComment(id, cId);
    const newComments = data.comments.filter((comment) => newPost.comments.includes(comment._id));
    setData({ ...data, comments: newComments });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await useGetPost(id);
        if(!post){
          return toast.error("Post Not Found");
        }
        setData(post);
      } catch (error) {
        console.log("Error in PostPage", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-svh lg:w-[500px] md:w-2/3 w-full relative md:p-2 overflow-auto flex flex-col justify-start">
      <div className="py-3 border-b items-start">
        {data && <Post post={data} /> }
        
      </div>
      <div className="pb-16 md:pb-5">
        {data && data.comments.length === 0 && (<p className="w-full text-center p-5">Be the First One to Comment</p>)}
        {data && data.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} deleteComment={deleteComment} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
