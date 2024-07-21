import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null) ;
  return (
    <UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>
    );
}