import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
            {children}
        </ThemeContext.Provider>
    );
};