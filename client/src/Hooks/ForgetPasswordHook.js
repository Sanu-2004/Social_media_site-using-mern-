import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserContext";

export const ForgetPasswordHook = () => {
    const {setUser} = useUserContext();
    const SendOTP = async (email) => {
        try {
          if (!email) {
            return toast.error("Please enter email");
          }
          const res = await fetch("/api/auth/forgetpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (data.error) {
            toast.error(data.error);
            return false
          }else{
            toast.success("OTP sent to your email");
            return true
          }
        } catch (error) {
          console.log(error);
        }
      };

      const VerifyOtp = async (email, otp) => {
        try {
          if (!otp) {
            return toast.error("Please enter OTP");
          }
          const res = await fetch("/api/auth/verifyotp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
            credentials: "include",
          });
          console.log(res);
          const data = await res.json();
          if (data.error) {
            toast.error(data.error);
          }else{
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            toast.success("OTP verified successfully");
          }
        } catch (error) {
          console.log(error);
        }
      }
      return {SendOTP, VerifyOtp}
};