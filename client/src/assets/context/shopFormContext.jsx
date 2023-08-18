import React, { createContext, useState, useEffect } from 'react';

export const ShoppingFormContext = createContext();

export const ShoppingFormContextProvider = ({ children }) => {
  const initialForm = {
    Name: "",
    Surname: "",
    IDCardNumber: "",
    Email: "",
    Number: "",
    Country: "Azerbaijan",
    City: "",
    Street: "",
    ZipCode: "",
  };

  const storedForm = JSON.parse(localStorage.getItem('shopForm')) || initialForm;
  const [shopForm, setShopForm] = useState(storedForm);

  useEffect(() => {
    localStorage.setItem('shopForm', JSON.stringify(shopForm));
  }, [shopForm]);

  return (
    <ShoppingFormContext.Provider value={{ shopForm, setShopForm }}>
      {children}
    </ShoppingFormContext.Provider>
  );
};
