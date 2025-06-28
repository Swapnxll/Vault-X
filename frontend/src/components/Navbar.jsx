import React, { useState } from "react";
import { Menu } from "lucide-react";
import FullMenu from "./Menu";
import LoginComponent from "./LoginComponent";
//import { UserData } from "../context/userContext";
const Navbar = ({ user }) => {
  //const { user } = UserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  console.log("hello", user);
  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-[#cdc6be] border-b border-gray-700 text-[#222] px-6 py-4 flex items-center justify-between font-serif z-50 relative">
        {/* Left: Logo */}
        <h1 className="text-2xl md:text-3xl font-[Special Elite] tracking-wider cursor-pointer">
          VX
        </h1>

        {/* Center: Headline */}
        {user ? (
          <h2 className="absolute left-1/2 transform -translate-x-1/2 font-heading text-lg md:text-xl tracking-wide uppercase font-[Special Elite]">
            The Daily Breach
          </h2>
        ) : (
          <h2 className="hidden md:block absolute left-1/2 transform -translate-x-1/2 font-heading text-lg md:text-xl tracking-wide uppercase font-[Special Elite]">
            The Daily Breach
          </h2>
        )}

        {/* Right: Menu Button & Get Started */}
        <div className="flex items-center space-x-4">
          {!user && (
            <button
              onClick={openLogin}
              className="font-heading bg-[#5c4035] text-white px-3 py-1 rounded hover:bg-[#4a322b] hover:underline transition"
            >
              Get Started
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="text-[#111] focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Full Menu Component */}
      <FullMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* Login Popup Component */}
      {showLogin && <LoginComponent onClose={closeLogin} />}
    </>
  );
};

export default Navbar;
