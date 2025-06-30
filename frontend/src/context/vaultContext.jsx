/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from "react";

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [masterKey, setMasterKey] = useState("");

  return (
    <VaultContext.Provider value={{ masterKey, setMasterKey }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
