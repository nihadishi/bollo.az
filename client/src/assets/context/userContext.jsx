import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);

    
    useEffect(() => {
      if(!user){
        axios.get('profile')
            .then(({data})=>{
                console.log("contex",data)
                setUser(data)
            }).catch(error =>{}
             )
      }
      // else{
      //   user.photo = '../../pages/LoginPage/img/OIP.jpeg'
      // }
    }, [])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
    
}