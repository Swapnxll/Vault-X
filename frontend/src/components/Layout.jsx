import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center font-serif">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};

export default Layout;
