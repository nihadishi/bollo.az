// export const FavContextProvider = ({ children }) => {
    // const [Fav, setFav] = useState([localStorage.getItem('favcontext')])

import { createContext, useState } from "react";

export const FavoriutesContext = createContext(null);

export const FavoriutesContextProvider = ({ children }) => {
    // const [Fav, setFav] = useState([localStorage.getItem('favcontext')])
    const [Fav, setFav] = useState([])
    // const localDatas = () => {
    //     localStorage.getItem('favcontext') && localStorage.getItem('favcontext').map(e => {
            
    //     })
    // }
    const isExist = (id) => {//have?
        return Fav.some((item) => item.id == id)
    }
    const ToggleFav = (data) => {
        if (isExist(data.id)) {//delete
            setFav((oldData) => oldData.filter(z => (data.id !== z.id)))
        }
        else {//add
            setFav([...Fav, data])
        }
    }
    const values = {
        Fav,
        isExist,
        ToggleFav
    }
    return <FavoriutesContext.Provider value={values}>{children}</FavoriutesContext.Provider>

}