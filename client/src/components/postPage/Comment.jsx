import React from "react";
import { useUserContext } from "../../Context/UserContext";
import { MdDelete } from "react-icons/md";

const Comment = ({ comment, deleteComment }) => {
  const { user } = useUserContext();
  const handleDeleteComment = () => {
    deleteComment(comment._id);
  };

  return (
    <div className="px-3 border-b last:border-0">
      <div className="w-full p-6 px-3 flex justify-between">
        <div className="w-2/3 flex gap-2">
          <img
            src={comment.commentedBy.profilePic}
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex items-center w-72">
            <div className="flex flex-col justify-start">
              <span className="pl-2 text-md">{comment.commentedBy.name}</span>
              <span className="pl-2 text-two text-sm">
                @{comment.commentedBy.username}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {comment.commentedBy._id === user.id && (
            <p
              className="text-xl text-red-500 cursor-pointer"
              onClick={handleDeleteComment}
            >
              <MdDelete />
            </p>
          )}
        </div>
      </div>
      <div className="px-6 py-3">
        <p className="text-sm"> {comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
