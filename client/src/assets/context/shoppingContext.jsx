import { createContext, useState } from "react";

export const ShoppingContext = createContext({})

export function ShoppingContextProvider({children}) {
    const [openShopping, setOpenShopping] = useState(false);
    const [shoppingItems,setShoppingItems] = useState([{}]);


    return(
        <ShoppingContext.Provider value={{openShopping,setOpenShopping,shoppingItems,setShoppingItems}}>
            {children}
        </ShoppingContext.Provider>
    )
    
}