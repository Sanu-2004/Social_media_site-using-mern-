import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import AddImage from "../common/AddImage";
import { CreatePostHook } from "../../Hooks/CreatePost.hook";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [post, setPost] = useState("");
  const { loading, useCreatePost } = CreatePostHook();
  const handlePost = (e) => {
    e.preventDefault();
    const success = useCreatePost(image, post);
    if (success) {
      setPost("");
      setImage(null);
    }
  };
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };
  return (
    <div>
      <div className="border-b pb-4">
        <div className="w-full p-6 flex flex-col md:flex-row justify-between gap-2">
          <img
            src="https://picsum.photos/200/300"
            className="w-[60px] h-[60px] rounded-full hidden md:flex"
          />
          <div className="flex md:hidden items-center w-72">
            <img
              src="https://picsum.photos/200/300"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <span className="pl-2 text-xl">John Doe</span>
              <span className="pl-2 text-two text-md">@jhondoe</span>
            </div>
          </div>
          <div className="border-b md:w-5/6 p-2 mx-2 flex items-end">
            <input
              type="text"
              placeholder="Say Something..."
              className="bg-primary focus:outline-none w-full"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-end items-center gap-4 px-8">
        {preview && (
        <div className="flex flex-col items-end">
          <button className="btn btn-ghost rounded-full" onClick={removeImage}>
            <IoMdClose />
          </button>
          <img src={preview} alt="preview" className="w-full rounded-lg" />
        </div>
      )}
          <AddImage setImage={setImage} setPreview={setPreview} />
          <button className="btn" onClick={handlePost}>
            {loading ? (
              <div className="flex gap-2 items-center">
                <div className="spnner"></div> Posting
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <MdAdd className="text-2xl" /> Post
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
