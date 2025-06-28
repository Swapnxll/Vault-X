import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(payload) {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/auth/public/user/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json", // ✅ send as JSON
          },
          withCredentials: true,
        }
      );

      // 🔑 Save only the token
      localStorage.setItem("token", data.token);
      console.log(data);

      setBtnLoading(false);
      navigate("/");
      window.location.href = "/";

      toast.success("Login successful");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  }

  async function fetchUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsAuth(false); // ensure auth is false if no token
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/auth/protect/user/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setUser(data); // fallback to null if no user in response

      setIsAuth(!!data.user); // boolean conversion for safety
    } catch (err) {
      console.error(err);
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        fetchUser,
        loading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
