import { useState } from "react";

const DeletePostHook = () => {
    const [loading, setLoading] = useState(false);
    const useDeletepost = async (postId) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/post/deletepost/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            // console.log(res);
            const data = await res.json();
            if (data.error) {
                return { error: data.error };
            }
            return data;
        } catch (error) {
            console.log("Error in DeletePost", error);
        }finally{
            setLoading(false);
        }
    };
    return { useDeletepost, loading };
};

export default DeletePostHook;