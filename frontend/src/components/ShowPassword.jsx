import React, { useState } from "react";

const RetrievePasswordForm = () => {
  const [retrieveSite, setRetrieveSite] = useState("");
  const [retrievedPassword, setRetrievedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRetrievePassword = () => {
    if (!retrieveSite) {
      alert("Please enter site name.");
      return;
    }
    // TODO: Get password from backend or state.
    // Here, we fake it:
    setRetrievedPassword("fake_password_123");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(retrievedPassword);
    alert("Password copied to clipboard.");
  };

  return (
    <div className="bg-[#3d3d3d] p-6 rounded-lg border border-black space-y-4">
      <h3 className="text-2xl font-vault text-[#764b3a]">Retrieve Password</h3>
      <input
        type="text"
        value={retrieveSite}
        onChange={(e) => setRetrieveSite(e.target.value)}
        placeholder="Site Name"
        className="w-full border rounded px-4 py-2 font-pixel focus:outline-none focus:ring-2 focus:ring-[#764b3a]"
      />
      <button
        onClick={handleRetrievePassword}
        className="bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-2 rounded font-pixel w-full"
      >
        Get Password
      </button>

      {/* Retrieved Password Card */}
      {retrievedPassword && (
        <div className="mt-4 bg-[#252525] p-4 rounded-lg border border-black space-y-2">
          <h4 className="text-xl font-vault text-[#764b3a]">
            Site: {retrieveSite}
          </h4>
          <div className="flex items-center gap-4">
            <span className="font-pixel">
              {showPassword ? retrievedPassword : "••••••••••"}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm underline text-[#764b3a]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <button
              onClick={handleCopy}
              className="text-sm underline text-[#764b3a]"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetrievePasswordForm;
