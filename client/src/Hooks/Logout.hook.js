import { useState } from "react";
import { useUserContext } from "../Context/UserContext";
import toast from "react-hot-toast";

export const LogoutHook = () => {
    const [loading, setLoading] = useState(false);
    const {setUser} = useUserContext();
    const useLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            if(data.error){
                return toast.error(data.error);
            }
            if(data.message){
                toast.success(data.message);
            }
            localStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.log("Error in LogoutHook: ", error);
        }finally{
            setLoading(false);
        }
    };
    return {loading, useLogout};
};