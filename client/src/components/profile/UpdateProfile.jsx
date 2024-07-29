import React, { useState } from "react";
import AddImage from "../common/AddImage";
import { UpdateProfileHook } from "../../Hooks/UpdateProfileHook";
import toast from "react-hot-toast";
import { set } from "mongoose";

const UpdateProfile = ({ profile }) => {
  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    link: "",
    bio: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(profile.profilePic || null);
  const { loading, updateProfile } = UpdateProfileHook();

  const handleUpdate = async () => {
    setDetails({ ...details, profilePic: image });
    console.log(details);

    const user = await updateProfile(details);
    if (user) {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="relative w-28 h-28 m-3">
          <img src={preview} alt="profile" className="w-28 h-28 rounded-full" />
          <div className="absoltue z-30 translate-y-[-100%] rounded-full bg-base-300 opacity-0 hover:opacity-75 w-28 h-28">
            <div className="z-50 flex absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
              <AddImage setImage={setImage} setPreview={setPreview} />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 px-2">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="UserName"
            className="input input-bordered w-full"
            value={details.username}
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full gap-2 p-2">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            className="input input-bordered"
            value={details.link}
            onChange={(e) => setDetails({ ...details, link: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full gap-2 px-2">
          <textarea
            className="textarea textarea-bordered"
            placeholder="Bio"
            value={details.bio}
            onChange={(e) => setDetails({ ...details, bio: e.target.value })}
          ></textarea>
        </div>
        <div className="px-2 w-full py-2">
          <button
            className="btn btn-outline w-full"
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
