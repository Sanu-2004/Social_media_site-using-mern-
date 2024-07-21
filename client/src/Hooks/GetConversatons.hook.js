import { useConversationContext } from "../Context/ConversationContext";

export const getConversationsHook = () => {
    const { setAllConversations } = useConversationContext();
    const useGetConversations = async () => {
        try {
            const res = await fetch("api/message/getallconversation", {
                credentials: "include",
            });
            const data = await res.json();
            setAllConversations(data);
            return data;
        } catch (error) {
            console.log("Error in getConversations", error);
        };
    }
    return { useGetConversations };
}