/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from "react";

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [masterKey, setMasterKey] = useState("");
  const [serversActive, setServersActive] = useState(false);

  return (
    <VaultContext.Provider
      value={{
        masterKey,
        setMasterKey,
        serversActive, // ✅ Exporting
        setServersActive,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
