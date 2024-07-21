import { useState } from "react";

export const getConversationsHook = () => {
    const [conversations, setConversations] = useState([]);
    const useGetConversations = async () => {
        try {
            const res = await fetch("/api/message/getconversation", {
                credentials: "include",
            });
            const data = await res.json();
            await setConversations(data);
            return data;
        } catch (error) {
            console.log("Error in getConversations", error);

        };
    }
    return { conversations, useGetConversations };
}