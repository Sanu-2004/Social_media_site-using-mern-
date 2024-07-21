import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

export const searchUserHook = () => {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const useSearchUser = async (key) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/search?u=${key}`, {
                credentials: "include",
            });
            let data = await res.json();
            if (data.length > 0) {
                data = data.filter((u) => u._id !== user.id);
                data = data.map((u) => {
                    u.linked = u.linkers.includes(user.id);
                    return u;
                });
            }
            return data;
        } catch (error) {
            console.log("Error in useUserSuggestions", error);
            return [];
        } finally {
            setLoading(false);
        }
    };
    return { useSearchUser, loading };
};