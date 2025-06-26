import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧩 Login function: name, email, profilePic
  async function loginUser({ name, email, profilePic }) {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/user/create`,
        { name, email, profilePic },
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuth(true);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  // 📡 Get user on refresh
  async function getUser() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/user/profile`,
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, loginUser, getUser, loading }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
