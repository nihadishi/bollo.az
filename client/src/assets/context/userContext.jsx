import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const initialState = localStorage.getItem("userDatas");
    const [user,setUser] = useState(JSON.parse(initialState));
    console.log("user",user)
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('user/profile');
                setUser(response.data);
                
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
        localStorage.setItem("userDatas", JSON.stringify(user[0]));
    }, [user])
    // console.log("user",user);
    return(
        <UserContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )
    
}