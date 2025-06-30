import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useVault } from "../context/vaultContext";

const VaultEntry = ({ setIsAuthenticated }) => {
  const [masterKeyInput, setMasterKeyInput] = useState("");
  const { masterKey, setMasterKey } = useVault(); // ✅ use context
  const [mode, setMode] = useState(masterKey === "" ? "create" : "enter");

  const hasKey = masterKey !== "";

  const handleMasterKeySubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/vault/protect/vault/check",
        { masterkey: masterKeyInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        setMasterKey(masterKeyInput);
        toast.success("Master key verified.");
      } else {
        toast.error("Incorrect master key.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying master key.");
    }
    setMasterKeyInput("");
  };

  const handleCreateMasterKey = async () => {
    if (masterKeyInput.trim() === "") {
      toast.error("Please enter a master key to create.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/vault/protect/vault/create",
        { masterkey: masterKeyInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Master key created.");
        setMode("enter"); // Switch to enter mode after creation
      } else {
        toast.error("Failed to create master key.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error creating master key."
      );
    }

    setMasterKeyInput("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Toaster position="top-right" />
      {/* Left Section */}
      <div className="w-full lg:w-2/3 bg-[#3d3d3d] p-6 rounded-lg border border-black space-y-4">
        <h2 className="text-3xl font-vault text-[#764b3a]">Password Vault</h2>
        <p className="font-article text-gray-300">
          {hasKey
            ? "Have a master key? Enter it to access your vault."
            : "Don’t have a master key? Create one to secure your vault."}
        </p>
        <button
          onClick={() => setMode(mode === "enter" ? "create" : "enter")}
          className="text-[#764b3a] underline mt-2"
        >
          {mode === "enter"
            ? "Don't have a master key? Create one."
            : "Already have a master key? Enter it."}
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 bg-[#3d3d3d] p-6 rounded-lg border border-black">
        <h3 className="text-2xl font-vault mb-4 text-[#764b3a]">
          {mode === "enter" ? "Enter Master Key" : "Create Master Key"}
        </h3>
        <input
          type="password"
          value={masterKeyInput}
          onChange={(e) => setMasterKeyInput(e.target.value)}
          placeholder={mode === "enter" ? "Enter Master Key" : "New Master Key"}
          className="w-full border rounded px-4 py-2 mb-4 font-pixel focus:outline-none focus:ring-2 focus:ring-[#764b3a]"
        />
        <button
          onClick={
            mode === "enter" ? handleMasterKeySubmit : handleCreateMasterKey
          }
          className="bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-2 rounded w-full font-pixel"
        >
          {mode === "enter" ? "Submit" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default VaultEntry;
