import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    // const initialState = axios.get('user/profile')
    // .then(({data})=>{
    //     console.log("contex",data)
    //     setUser(data)
    // }).catch(error =>{}
    //  )
    const [user,setUser] = useState(null);
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

    }, [user])
    // console.log("user",user);
    return(
        <UserContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )
    
}