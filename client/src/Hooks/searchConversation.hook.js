import { useState } from "react";

export const SearchConversationHook = () => {
    const [users, setUsers] = useState([]);
    const searchConvertationUser = async (search) => {
        try {
            const res = await fetch(`/api/message/search?key=${search}`, {
                credentials: "include",
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.log("Error in searchUser", error);
        }
    };
    return { users, searchConvertationUser}
};