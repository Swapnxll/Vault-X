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
        <Route
          path="/breach"
          element={user ? <Breach user={user} /> : <Home />}
        />

        <Route path="/vault" element={user ? <Vault /> : <Home />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Home />}
        />

        {/* Add more routes as needed */}
      </Routes>
    </>
  );
};

export default NewspaperPage;
