import React, { useState } from "react";
import VaultEntry from "../components/VaultEntry.jsx";
import VaultActions from "../components/VaultAction.jsx";
import Footer from "../components/Footer.jsx";

const Vault = () => {
  const [savedMasterKey, setSavedMasterKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="font-vault bg-black text-[#cdc6be] w-full text-center overflow-hidden px-[5px] my-5">
        <div className="text-[15vw] leading-none">1.THE VAULT</div>
      </div>

      <div className="flex-grow p-4 lg:p-10 text-white">
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

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Vault;
