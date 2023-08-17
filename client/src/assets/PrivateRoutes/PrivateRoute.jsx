import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { TotalPriceContext } from "../context/TotalPriceContext";
import PaymentPage from "../../pages/PaymentPage/PaymentPage";
import ProductsPage from "../../pages/ProductsPage/ProductsPage";

const PrivateRoute = ({ element, condition, redirectPath }) => {
    const { totalPriceCont } = useContext(TotalPriceContext);
    return totalPriceCont ? <PaymentPage isAuth={true}/> : <PaymentPage isAuth={false}/>;
  };

export default PrivateRoute;
