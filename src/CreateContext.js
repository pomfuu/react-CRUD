import React, { createContext, useContext, useState } from "react";

const VendorContext = createContext();

export const useVendor = () => useContext(VendorContext);

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState("logged_in_vendor_username"); // Replace with actual logic
  return (
    <VendorContext.Provider value={{ vendor, setVendor }}>
      {children}
    </VendorContext.Provider>
  );
};
