import React, { useContext, useEffect } from 'react';
import "./style.scss";
import { UserContext } from '../../assets/context/userContext';

import Footer from '../../layouts/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar';
const OrderPageFromCustomers = () => {
    const { user, setUser, loading, setLoading } = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
        const timeout = setTimeout(() => {
          if (user) clearInterval(timeout);
          setLoading(false);
        }, 1000);
      });
    if(!loading){
        if(user){
            return(<>
            <Navbar/>
                <div className="">

                </div>
            <Footer/>
            </>)
        }
        else{
            navigate("/profile")
        }
    }

}

export default OrderPageFromCustomers