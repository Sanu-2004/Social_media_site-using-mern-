import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useUserContext } from "../Context/UserContext";

export const SignupHook = () => {
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useUserContext();

    const useSignup = async (details) => {
        setLoading(true);
        try {
            if(!details.fullName || !details.email || !details.username || !details.password || !details.confirmPassword){
                return toast.error("All fields are required");
            }
            if(!details.email.includes("@") || !details.email.includes(".")){
                return toast.error("Invalid email");
            }
            if(details.password.length < 8){
                return toast.error("Password must be at least 8 characters long");
            }
            if(details.password !== details.confirmPassword){
                return toast.error("Password does not match");
            }
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: details.fullName,
                    email: details.email,
                    username: details.username,
                    password: details.password,
                    confirmPassword: details.confirmPassword
                }),
                credentials: "include",
            });
            const data = await res.json();
            if(data.error){
                return toast.error(data.error);
            }
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log("Error in SignupHook: ", error);
            
        }finally{
            setLoading(false);
        }
    };
    return {loading, useSignup};
};