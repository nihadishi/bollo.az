import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../assets/context/userContext";
import back from "./img/back.png";
import Loading from "../../layouts/Loading/Loading";
import { ShoppingContext } from "../../assets/context/shoppingContext";

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState({});
  const {loading,setLoading} = useContext(UserContext);
  const navigate = useNavigate();
  const productID = useParams();
  const {shoppingItems, setShoppingItems } = useContext(ShoppingContext);
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/products/id/${productID.productID}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 400);
  }, []);

  const isInBasket = shoppingItems.some(item => item._id === productData._id);

  const handleAddToBasket = () => {
    if (!shoppingItems.find(item => item._id === productData._id)) {
      setShoppingItems(prevItems => [...prevItems, productData]);
    }
  };
  if (!loading) {
    return (
      <div className="product-details">
        <div className="product-image">
          <img
            src={`http://localhost:5000/products/${productData.productimage}`}
            alt={productData.productname}
          />
        </div>
        <div className="product-info">
          <div className="product-info-back" onClick={()=>{
            navigate("/products")
          }}>
            <img src={back} alt="<--" /> Back to Products
          </div>
          <div className="product-info-head">
            <p>{productData.productcategory}</p>
            <h2>{productData.productname}</h2>
          </div>
          <div className="product-info-quality">
          <p>Quality:</p>
          <div
      style={{
        backgroundColor: productData.producttype === "Fresh" ? "#00ac22" : "#f7d1b5"
      }}
    >{productData.producttype}</div> 
          </div>
         <div className="product-info-details">
          <div className="product-info-details-general">
          <div>{productData.fullname}</div>
          <div>{productData.city}, {productData.region}</div>
          </div>
          <div className="product-info-details-description">
          <div>{productData.productdescription}</div>
          </div>
         </div>
        </div>
        <div className="product-order">
          <div className="product-order-detail">
            <div className="product-order-detail-l">
              <div className="product-order-detail-l-img"><img src={`http://localhost:5000/products/${productData.productimage}`} alt="" /></div>
              <div className="product-order-detail-l-name">
                <div className="product-order-detail-l-name-name">{productData.productname}</div>
                <div className="product-order-detail-l-name-region">{productData.region}</div>
              </div>
            </div>
            <div className="product-order-detail-r">
              <div className="product-order-detail-r-price">{productData.productprice} {productData.productunit}</div>
              <div className="product-order-detail-r-addbasket"  onClick={handleAddToBasket} style={{
        backgroundColor: isInBasket ? "#00ac22" : "#000ca8"
      }}> {isInBasket ? "Already in Basket" : "Add to Basket"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else{
    return <Loading/>
  }
};

export default ProductDetailsPage;
