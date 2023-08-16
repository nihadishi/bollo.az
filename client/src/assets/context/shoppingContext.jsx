import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShoppingContext = createContext({});

export function ShoppingContextProvider({ children }) {

  const [openShopping, setOpenShopping] = useState(false);
  const [products, setProducts] = useState([]);
  const [shoppingItems, setShoppingItems] = useState(()=>{
    const storedItems = localStorage.getItem("shoppingItems");
    
    if(storedItems){
        return JSON.parse(storedItems);
    }
    return [{}];
    
  });
  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
 
  }, []);
  return (
    <ShoppingContext.Provider
      value={{ openShopping, setOpenShopping, shoppingItems, setShoppingItems, products, setProducts }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
