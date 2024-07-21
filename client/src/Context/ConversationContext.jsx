import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
    const [conversation, setConversation] = useState(null);
    const [allConversations, setAllConversations] = useState([]);
    return (
        <ConversationContext.Provider value={{conversation, setConversation, allConversations, setAllConversations}}>
            {children}
        </ConversationContext.Provider>
    );
};