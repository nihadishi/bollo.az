import React, { createContext, useContext, useState } from "react";

export const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPriceCont, setTotalPriceCont] = useState(0);

  return (
    <TotalPriceContext.Provider value={{ totalPriceCont, setTotalPriceCont }}>
      {children}
    </TotalPriceContext.Provider>
  );
};