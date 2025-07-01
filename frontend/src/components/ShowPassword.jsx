import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useVault } from "../context/vaultContext";
import { Eye, EyeOff, Copy } from "lucide-react";

const RetrievePasswordForm = () => {
  const [retrieveSite, setRetrieveSite] = useState("");
  const [retrievedData, setRetrievedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { masterKey } = useVault(); // ✅ get masterKey from context
  const [loading, setLoading] = useState(false);

  const handleRetrievePassword = async () => {
    if (!retrieveSite) {
      toast.error("Please enter site name.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/vault/protect/vault/site`,
        {
          site: retrieveSite,
          masterkey: masterKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const passwords = response.data.passwords;
        if (passwords.length > 0) {
          const data = passwords[0]; // assuming you want the first matched entry
          setRetrievedData(data);
          toast.success("Password retrieved successfully.");
        } else {
          toast.error("No password found for this site.");
          setRetrievedData(null);
        }
      } else {
        toast.error("Failed to retrieve password.");
        setRetrievedData(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error retrieving password.",
        error
      );
      setRetrievedData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (retrievedData?.password) {
      navigator.clipboard.writeText(retrievedData.password);
      toast.success("Password copied to clipboard.");
    }
  };

  return (
    <div className=" p-6 rounded-lg border border-black space-y-4">
      <h3 className="text-4xl text-center font-article text-black">
        Show Password
      </h3>

      <input
        type="text"
        value={retrieveSite}
        onChange={(e) => setRetrieveSite(e.target.value)}
        placeholder="Site Name"
        className="w-full border rounded px-4 py-2 font-article focus:outline-none text-black focus:ring-2 focus:ring-[#764b3a]"
      />

      <button
        onClick={handleRetrievePassword}
        disabled={loading}
        className="bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-2 rounded font-article w-full"
      >
        {loading ? "Loading..." : "Get Password"}
      </button>

      {/* Retrieved Password Card */}
      {retrievedData && (
        <div className="mt-4  p-4 rounded-lg border border-black space-y-2">
          <h4 className="text-xl font-vault text-[#764b3a]">
            Site: {retrievedData.site}
          </h4>
          <p className="text-black text-xl font-article">
            Email: {retrievedData.email}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-article text-3xl text-black">
              {showPassword ? retrievedData.password : "••••••••••"}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#764b3a]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <button onClick={handleCopy} className="text-[#764b3a]">
              <Copy size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetrievePasswordForm;
