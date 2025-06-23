import React, { useState } from "react";
import { Menu } from "lucide-react";
import FullMenu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-[#cdc6be] border-b border-gray-700 text-[#222] px-6 py-4 flex items-center justify-between font-serif z-50 relative">
        {/* Left: Logo */}
        <h1 className="text-2xl cursor-pointer md:text-3xl font-[Special Elite] tracking-wider">
          VX
        </h1>

        {/* Center: Headline */}
        <h2 className="absolute left-1/2 -translate-x-1/2 font-heading text-lg md:text-xl tracking-wide uppercase font-[Special Elite]">
          The Daily Breach
        </h2>

        {/* Right: Menu Button */}
        <button onClick={toggleMenu} className="text-[#111] focus:outline-none">
          <Menu size={28} />
        </button>
      </nav>

      <FullMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
