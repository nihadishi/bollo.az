import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const initialState = localStorage.getItem("userDatas");
    const [user,setUser] = useState(initialState);
    console.log("user",user)
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('user/profile');
                setUser(response.data);
                localStorage.setItem("userDatas", response.data);
            } catch (error) {
                console.error(error);
            } 
            // finally {
            //     setLoading(false);
            // }
        };

        if (!user) {
            fetchData();
        }

    }, [user])
    // console.log("user",user);
    return(
        <UserContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )
    
}