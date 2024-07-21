import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

export const LikeUserHook = () => {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const useLikeUser = async (key) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/link/${key}`, {
                method: "PUT",
                credentials: "include",
            });
            let data = await res.json();
            return data;
        } catch (error) {
            console.log("Error in useUserSuggestions", error);
            return [];
        } finally {
            setLoading(false);
        }
    };
    return { useLikeUser, loading };
};