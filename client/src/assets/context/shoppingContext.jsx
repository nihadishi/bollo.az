import { createContext, useState } from "react";

export const ShoppingContext = createContext({})

export function ShoppingContextProvider({children}) {
    const [openShopping, setOpenShopping] = useState(false);
    const [shoppingItems,setShoppingItems] = useState([{}]);
    const [shoppingItemsCount,setShoppingItemsCount] = useState([{}]);
    // setShoppingItems(shoppingItems.splice(0,1))


    return(
        <ShoppingContext.Provider value={{openShopping,setOpenShopping,shoppingItems,setShoppingItems,shoppingItemsCount,setShoppingItemsCount}}>
            {children}
        </ShoppingContext.Provider>
    )
    
}