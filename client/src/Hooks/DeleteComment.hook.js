import { useState } from "react";
import toast from "react-hot-toast";

export const DeleteCommentHook = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const useDeleteComment = async (postId, commentId) => {
        setDeleteLoading(true);
        try {
            const res = await fetch('/api/post/deletecomment', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId, commentId }),
                credentials: "include",
            });
            const data = await res.json();
            if (data.error) {
                return toast.error(data.error);
            }
            return data;
        } catch (error) {
            console.log("Error in useDeleteComment", error);
        } finally {
            setDeleteLoading(false);
        }
    };
    return { useDeleteComment, deleteLoading };
};