import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Breach from "./pages/Breach"; // example route page

const NewspaperPage = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breach" element={<Breach />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default NewspaperPage;
