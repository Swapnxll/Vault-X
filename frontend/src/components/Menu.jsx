import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FullMenu = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
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

        <ul className="space-y-4 text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-wider text-center">
          <li
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className={`cursor-pointer ${!user ? "line-through" : ""}`}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/breach");
              onClose();
            }}
            className={`cursor-pointer ${!user ? "line-through" : ""}`}
          >
            The Breach
          </li>
          <li
            onClick={() => {
              navigate("/vault");
              onClose();
            }}
            className={`cursor-pointer ${!user ? "line-through" : ""}`}
          >
            The Vault
          </li>
          {!user && (
            <li
              onClick={() => {
                navigate("/");
                onClose();
              }}
              className="cursor-pointer"
            >
              Get Started
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FullMenu;
