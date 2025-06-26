import React from "react";
import { useAuth } from "../context/userContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { user, isAuth, loginUser, loading } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;
      console.log(name, email, picture);
      await loginUser({
        name,
        email,
        profilePic: picture,
      });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="text-xl font-semibold">Loading...</div>
      ) : isAuth && user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
          <img
            src={user.profilePic}
            alt="Profile"
            className="rounded-full w-24 h-24 mx-auto"
          />
        </div>
      ) : (
        <div className="p-8 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Login Failed")}
          />
        </div>
      )}
    </div>
    // <div className="p-8 bg-white rounded shadow text-center">
    //   <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
    //   <GoogleLogin
    //     onSuccess={handleSuccess}
    //     onError={() => alert("Login Failed")}
    //   />
    // </div>
  );
};

export default Login;
