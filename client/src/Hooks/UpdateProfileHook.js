import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserContext";
import { useState } from "react";
import { json } from "react-router-dom";

export const UpdateProfileHook = () => {
    const [loading, setLoading] = useState(false);
    const {setUser}=useUserContext()
    const updateProfile = async (data) => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/updateprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            const user = await res.json();
            if(user.error){
                toast.error(user.error);
                return false
            }
            user.id=user._id;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            console.log("Error in updateProfile", error);
            return { error: "Internal server error" };
        } finally {
            setLoading(false);
        }
    }
    return { updateProfile, loading };
};