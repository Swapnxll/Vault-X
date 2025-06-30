import React, { useState } from "react";
import VaultEntry from "../components/VaultEntry.jsx";
import VaultActions from "../components/VaultAction.jsx";

const Vault = () => {
  const [savedMasterKey, setSavedMasterKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen p-4 lg:p-10 bg-[#252525] text-white">
      {!isAuthenticated ? (
        <VaultEntry
          savedMasterKey={savedMasterKey}
          setSavedMasterKey={setSavedMasterKey}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <VaultActions />
      )}
    </div>
  );
};

export default Vault;
