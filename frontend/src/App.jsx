import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Breach from "./pages/Breach";
import LoginComponent from "./components/LoginComponent";
import { UserData } from "./context/userContext";

const NewspaperPage = () => {
  const { user } = UserData();

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breach" element={<Breach />} />
        <Route path="/login" element={<LoginComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
};

export default NewspaperPage;
