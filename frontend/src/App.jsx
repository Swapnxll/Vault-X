import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Breach from "./pages/Breach";
import LoginComponent from "./components/LoginComponent";
import { UserData } from "./context/userContext";
import Profile from "./pages/Profile";
import Vault from "./pages/Vault";

const NewspaperPage = () => {
  const { user } = UserData();

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breach" element={<Breach user={user} />} />

        <Route path="/vault" element={<Vault />} />
        {/* <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Home />}
        /> */}
        <Route path="/profile" element={<Profile user={user} />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
};

export default NewspaperPage;
