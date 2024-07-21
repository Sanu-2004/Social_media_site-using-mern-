import { useState } from "react";
import toast from "react-hot-toast";

export const GetPostHook = () => {
    const [loading, setLoading] = useState(false);
    const useGetPost = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/post/getpost/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                return toast.error(data.error);
            }
            return data;
        } catch (error) {
            console.log("Error in useGetPost", error)
        } finally {
            setLoading(false);
        }
    };
    return { useGetPost, loading };
};