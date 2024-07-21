import toast from "react-hot-toast";

export const CommentPostHook = () => {
    const useCommentPost = async (id, text) => {
        try {
            const res = await fetch("/api/post/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, text:text }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.error) {
                return toast.error(data.error);
            }
            if(data._id){
                toast.success("Commented successfully");
            }
            return data;
        } catch (error) {
            console.log("Error in commentPostHook", error);
        }
    };
    return { useCommentPost };
};