import React, { createContext, useState, useContext } from 'react';

export const ShoppingFormContext = createContext();

export const ShoppingFormContextProvider = ({ children }) => {
  const [shopForm, setShopForm] = useState({
    Name: "",
    Surname: "",
    IDCardNumber: "",
    Email: "",
    Number: "",
    Country: "Azerbaijan",
    City: "",
    Street: "",
    ZipCode: "",
  });

  return (
    <ShoppingFormContext.Provider value={{ shopForm, setShopForm }}>
      {children}
    </ShoppingFormContext.Provider>
  );
};
