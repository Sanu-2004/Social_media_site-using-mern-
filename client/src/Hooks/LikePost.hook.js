import { useState } from "react";
import toast from "react-hot-toast";

export const LikePostHook = () => {
    const [likeLoading, setLikeLoading] = useState(false);
    const useLikePost = async (postId) => {
        setLikeLoading(true);
        try {
            const res = await fetch(`/api/post/likepost/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            if(data.error){
                toast.error(data.error);
            }
            return data;
        } catch (error) {
            console.log("Error in likePost", error);
        } finally {
            setLikeLoading(false);
        }
    };
    return {useLikePost, likeLoading};
};