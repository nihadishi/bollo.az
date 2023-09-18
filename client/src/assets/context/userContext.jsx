import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
//   const initialState = localStorage.getItem("userDatas");
// const [user, setUser] = useState(JSON.parse(initialState));

const initialState = null;
const [user, setUser] = useState(initialState);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("user/profile");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchData();
    }
    console.log("userr",user);
    // localStorage.setItem(
    //   "userDatas",
    //   JSON.stringify({
    //     city: user?.city,
    //     createdAt: user?.createdAt,
    //     email: user?.email,
    //     fullname: user?.fullname,
    //     image: user?.image,
    //     number: user?.number,
    //     password: user?.password,
    //     region: user?.region,
    //     __v: 0,
    //     _id: user?._id,
    //   })
    // );
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
}
