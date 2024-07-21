import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

export const UserSuggestionsHook = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext();
    const useUserSuggestions = async (key) => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/suggestion", {
                credentials: "include",
            });
            let data = await res.json();
            if (data.length > 0) {
                data = data?.map((u) => {
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
    return { useUserSuggestions, loading };
};