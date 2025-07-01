import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useVault } from "../context/vaultContext";

const AddPasswordForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [siteInput, setSiteInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { masterKey } = useVault(); // ✅ get masterKey from context
  const [loading, setLoading] = useState(false);

  const handleAddPassword = async () => {
    if (!emailInput || !siteInput || !passwordInput) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/vault/protect/vault/add`,
        {
          email: emailInput,
          site: siteInput,
          password: passwordInput,
          masterkey: masterKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success(`Password for "${siteInput}" added.`);
        setEmailInput("");
        setSiteInput("");
        setPasswordInput("");
      } else {
        toast.error("Failed to add password.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-6 rounded-lg border border-black space-y-4 text-center">
      <h3 className="text-4xl font-article  text-black">Add New Password</h3>

      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="Email"
        className="w-full border text-black rounded px-4 py-2 font-article focus:outline-none focus:ring-2 focus:ring-[#764b3a]"
      />

      <input
        type="text"
        value={siteInput}
        onChange={(e) => setSiteInput(e.target.value)}
        placeholder="Site Name"
        className="w-full border text-black rounded px-4 py-2 font-article focus:outline-none focus:ring-2 focus:ring-[#764b3a]"
      />

      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Password"
        className="w-full border text-black rounded px-4 py-2 font-article focus:outline-none focus:ring-2 focus:ring-[#764b3a]"
      />

      <button
        onClick={handleAddPassword}
        disabled={loading}
        className="bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-2 rounded font-article w-full"
      >
        {loading ? "Saving..." : "Save Password"}
      </button>
    </div>
  );
};

export default AddPasswordForm;
