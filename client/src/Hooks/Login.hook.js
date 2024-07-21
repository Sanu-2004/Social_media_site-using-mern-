import { useState } from "react";
import { useUserContext } from "../Context/UserContext";
import { toast } from 'react-hot-toast';

export const LoginHook = (details) => {
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useUserContext();
    const useLogin = async (details) => {
        setLoading(true);
        try {
            if(!details.username || !details.password){
                return toast.error("All fields are required");
            }
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details),
                credentials: "include",
            });
            const data = await res.json();
            if(data.error){
                return toast.error(data.error);
            }
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log("Error in LoginHook: ", error);
        }finally{
            setLoading(false);
        }
        
    };
    return {loading, useLogin};
};