import React from "react";
import img from "../assets/loginimg.jpg";
import { useGoogleLogin } from "@react-oauth/google";
//import { jwtDecode } from "jwt-decode";
import { UserData } from "../context/userContext";

const LoginComponent = ({ onClose }) => {
  const { loginUser } = UserData();
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const Glogin = useGoogleLogin({
    ux_mode: "popup",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await res.json();

        const payload = {
          email: userInfo.email,
          name: userInfo.name,
          profile: userInfo.picture,
        };
        await loginUser(payload);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="flex relative" onClick={handleContentClick}>
        {/* Left Image */}
        <div className="w-[200px] bg-white rounded-l-lg overflow-hidden">
          <img src={img} alt="Login visual" className="w-full h-auto" />
        </div>

        {/* Right Login Section */}
        <div className="bg-[#cdc6be] w-[200px] flex flex-col items-center justify-center rounded-r-lg p-4">
          <button
            onClick={() => Glogin()}
            className="bg-[#5c4035] text-white px-4 py-2 rounded shadow hover:bg-[#4a322b] transition"
          >
            Login with Google
          </button>
          {/* <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-600 hover:underline"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
