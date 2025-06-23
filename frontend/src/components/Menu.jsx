import React from "react";
import { X } from "lucide-react";

const FullMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#000] text-[#cdc6be] font-serif overflow-hidden z-50 transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-screen space-y-8 relative px-6">
        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#cdc6be] focus:outline-none"
        >
          <X size={32} />
        </button>

        {/* <h2 className="text-4xl font-[Special Elite] tracking-widest mb-4">
          Menu
        </h2> */}

        <ul className="space-y-4 text-5xl uppercase font-bold tracking-wider text-center">
          <li className="cursor-pointer">Intro</li>
          <li className="cursor-pointer">The Breach</li>
          <li className="cursor-pointer">The Vault</li>
          <li className="cursor-pointer">Privacy Policy</li>
          <li className="cursor-pointer">About Me</li>
        </ul>
      </div>
    </div>
  );
};

export default FullMenu;
