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
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem('shopForm', JSON.stringify(shopForm));
    localStorage.setItem('shopFormEmail',JSON.stringify(shopForm.Email))
  }, [shopForm]);

  return (
    <ShoppingFormContext.Provider value={{ shopForm, setShopForm,loading,setLoading }}>
      {children}
    </ShoppingFormContext.Provider>
  );
};
