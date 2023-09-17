import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const initialState =  axios.get('user/profile')
    .then(({data})=>{
        setUser(data)
    }).catch(error =>{}
     )
    const [user,setUser] = useState(initialState);
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('user/profile')
            .then(({data})=>{
                setUser(data)
            }).catch(error =>{}
             )

    }, [user])
    return(
        <UserContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )
    
}