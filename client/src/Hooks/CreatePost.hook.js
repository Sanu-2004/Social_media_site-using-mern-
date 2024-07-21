import { useState } from "react";
import toast from "react-hot-toast";

export const CreatePostHook = () => {
    const [loading, setLoading] = useState(false);
    const useCreatePost = async (image, text) => {
        setLoading(true);
        try {
            if(!image && !text) {
                toast.error("Please add image or post");
                return;
            }
            const post = await fetch("/api/post/createpost",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    text,
                    image,
                 }),
            })
            const data = await post.json();
            if(data.error) {
                toast.error(data.error);
            }
            if(data._id) {
                toast.success("Post created successfully");
            }
            return true;
        } catch (error) {
            console.log("Error in CreatePostHook: ", error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, useCreatePost };
};