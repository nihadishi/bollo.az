import { createContext, useEffect, useState } from "react";

export const ShoppingContext = createContext({});

export function ShoppingContextProvider({ children }) {
  const [openShopping, setOpenShopping] = useState(false);
  const [shoppingItems, setShoppingItems] = useState(()=>{
    const storedItems = localStorage.getItem("shoppingItems");
    if(storedItems){
        return JSON.parse(storedItems);
    }
    return [{}];

  });
  return (
    <ShoppingContext.Provider
      value={{ openShopping, setOpenShopping, shoppingItems, setShoppingItems }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
