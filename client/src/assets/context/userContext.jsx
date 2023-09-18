import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

const initialState = null;
const [user, setUser] = useState(initialState);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
        axios.get('user/profile')
            .then(({data})=>{
                setUser(data)
            }).catch(error =>{}
             )
  }, []);
  useEffect(() => {
    if(!user){
        axios.get('user/profile')
            .then(({data})=>{
                // console.log("contex",data)
                setUser(data)
            }).catch(error =>{}
             )
      }
    console.log("userr",user);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
}
