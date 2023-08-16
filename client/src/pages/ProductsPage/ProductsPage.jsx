import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import addicon from "./img/add-icon.png";
import minusicon from "./img/added-icon.png";
import defaultProduct from "./img/default_1.jpg"
import likeProduct from "./img/like.png"
import { FavoriutesContext } from "../../assets/context/FavoriutesContext";
import axios from "axios";
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { useNavigate } from "react-router-dom";
const ProductsPage = () => {
 
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const {shoppingItems,setShoppingItems,products, setProducts} = useContext(ShoppingContext);
  const navigate = useNavigate();
  const AddShoppingContext = (product) => {
    console.log(product._id);
    console.log(shoppingItems);
    const updatedShoppingItems = [...shoppingItems];
    const index = updatedShoppingItems.findIndex(item => item._id === product._id);
  
    if (index !== -1) {
      updatedShoppingItems.splice(index, 1);
    } else {
      updatedShoppingItems.push(product);
    }
  
    setShoppingItems(updatedShoppingItems);
  };
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, [])
  
  // console.log(shoppingItems);
  if (!loading) {
    return (
      <div className="Products">
        {products.map((product) => (
          <div className="Products-Product" key={product._id}>
            <div className="Products-Product-TypeLike">
              <div className="Products-Product-TypeLike-Type">{product?.producttype === "Fresh"? <div className="Products-Product-TypeLike-Type-Fresh">{product.producttype}</div>: <div className="Products-Product-TypeLike-Type-NotFresh">{product.producttype}</div> }</div>
              <div className="Products-Product-TypeLike-Like"><img src={likeProduct} alt="" /></div>
            </div>
            <div className="Products-Product-Photo" onClick={()=>{navigate(`/products/id/${product._id}`)}}>
              {product?.productimage ? <img src={`http://localhost:5000/products/${product?.productimage}`} alt={product.productname} />:
              <img src={defaultProduct}/>
              }
              
            </div>
            <div className="Products-Product-About">
              <div className="Products-Product-About-S">
                <div className="Products-Product-About-S-Name">{product?.productname}</div>
                <div className="Products-Product-About-S-City">{product?.city}</div>
                <div className="Products-Product-About-S-Price">{product?.productprice} {product.productunit}</div>
                {/* <div className="Products-Product-About-S-Rating">5 5 5 5 5</div> */}
              </div>
              <div className="Products-Product-About-L" onClick={()=>{
                AddShoppingContext(product);
              }}>
               {shoppingItems.some(item => item._id === product._id) ? (
            <img src={minusicon} alt="-" /> // Eğer ürün sepette varsa "-" ikonu göster
          ) : (
            <img src={addicon} alt="+" /> // Eğer ürün sepette yoksa "+" ikonu göster
          )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return <Loading />;
  }
  
};
export default ProductsPage;