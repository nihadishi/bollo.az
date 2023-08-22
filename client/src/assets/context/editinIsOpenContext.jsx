import React, { createContext, useContext, useState } from "react";

export const EditingIsOpen = createContext();

export const EditingIsOpenProvider = ({children})=>{
    const [editing, setEditing] = useState(false);
    return (
        <EditingIsOpen.Provider value={{editing,setEditing}}>
            {children}
        </EditingIsOpen.Provider>
    )
}