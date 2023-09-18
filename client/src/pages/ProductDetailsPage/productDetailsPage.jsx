import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.scss";
import Footer from "../../layouts/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../assets/context/userContext";
import back from "./img/back.png";
import locationicon from "./img/locationicon.gif";
import calendaricon from "./img/calendaricon.png";
import farmericon from "./img/farmericon.png";
import freshiconwhite from "./img/freshiconwhite.png";
import importediconblue from "./img/importediconblue.png";
import greenhouseicongreen from "./img/greenhouseicongreen.png";
import othericon from "./img/othericon.png";
import Loading from "../../layouts/Loading/Loading";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import {BackendUrlContext} from "../../assets/context/backendUrlContext";

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState({});
  const { loading, setLoading } = useContext(UserContext);
  const {baseUrl} = useContext(BackendUrlContext);
  const navigate = useNavigate();
  const productID = useParams();
  const { shoppingItems, setShoppingItems, products, setProducts } =
    useContext(ShoppingContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/id/${productID.productID}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productID]);
  const isInBasket = shoppingItems.some((item) => item._id === productData._id);

  const handleAddToBasket = () => {
    if (!shoppingItems.find((item) => item._id === productData._id)) {
      setShoppingItems((prevItems) => [...prevItems, productData]);
    }
  };
  const handleMapLinkClick = (searchText) => {
    const encodedSearchText = encodeURIComponent(searchText);
    const googleMapsURL = `https://www.google.com/maps/search/${encodedSearchText}`;
    window.open(googleMapsURL, "_blank");
  };
  if (!loading) {
    return (
      <>
      <div className="product">
        <div className="product-details">
          <div className="product-image">
            <img
              src={`${baseUrl}/products/${productData.productimage}`}
              alt={productData.productname}
            />
          </div>
          <div className="product-info">
            <div
              className="product-info-back"
              onClick={() => {
                navigate("/products");
              }}
            >
              <img src={back} alt="<--" /><p>Back to Products</p>
            </div>
            <div className="product-info-head">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/products/search/${productData.productcategory}`);
                }}
              >
                {productData.productcategory}
              </p>
              <h2>{productData.productname}</h2>
            </div>
            <div className="product-info-quality">
              <p>Status:</p>

              <div
              onClick={() => {
                navigate(`/products/search/${productData.producttype}`);
              }}
                className="p-2 d-flex flex-row align-items-center justify-content-around gap-2 "
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    productData.producttype === "Fresh" ? "#00ac22" : "#f7d1b5",
                  width: "fit-content",
                  borderRadius: "20px",
                  textAlign: "center",
                  color:
                    productData.producttype === "Fresh"
                      ? "white"
                      : productData.producttype === "Greenhouse"
                      ? "#00AC22"
                      : productData.producttype === "Imported"
                      ? "#082E4A"
                      : "#8400A2"
                }}
              >
                <img
                  src={
                    productData.producttype === "Fresh"
                      ? freshiconwhite
                      : productData.producttype === "Greenhouse"
                      ? greenhouseicongreen
                      : productData.producttype === "Imported"
                      ? importediconblue
                      : othericon
                  }
                  alt=""
                  width={"50px"}
                  height={"50px"}
                />
                {productData.producttype}
              </div>
            </div>
            <div className="product-info-details">
              <div className="product-info-details-general">
                <div 
                style={{cursor:"pointer"}}
                onClick={() => {
                navigate(`/products/search/${productData.fullname}`);
              }}>
                  <img src={farmericon} alt="" width={"50px"} height={"50px"} />
                  {productData.fullname}
                </div>
                <div
                  onClick={() => {
                    handleMapLinkClick(productData.city);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={locationicon}
                    alt=""
                    width={"50px"}
                    height={"50px"}
                  />
                  {productData.city}, {productData.region}
                </div>
                <div>
                  <img
                    src={calendaricon}
                    alt=""
                    width={"50px"}
                    height={"50px"}
                  />
                  {productData.productexpirationdate}
                </div>
              </div>
              <div className="product-info-details-description" style={{backgroundColor:"#fcfcfc"}}>
                <div>{productData.productdescription}</div>
              </div>
            </div>
          </div>
          <div className="product-order">
            <div className="product-order-detail">
              <div className="product-order-detail-l">
                <div className="product-order-detail-l-img">
                  <img
                    src={`${baseUrl}/products/${productData.productimage}`}
                    alt=""
                  />
                </div>
                <div className="product-order-detail-l-name">
                  <div className="product-order-detail-l-name-name">
                    {productData.productname}
                  </div>
                  <div className="product-order-detail-l-name-region">
                    {productData.region}
                  </div>
                </div>
              </div>
              <div className="product-order-detail-r">
                <div className="product-order-detail-r-price">
                  {productData.productprice} {productData.productunit}
                </div>
                {user && user._id === productData.userid ? (
                  <div className="product-order-detail-r-add">
                  <div
                    className="product-order-detail-r-addbasket"
                    style={{ backgroundColor: "#7F7F7F" }}
                  >
                    It's your Product
                  </div>
                  </div>
                ) : (
                  <div className="product-order-detail-r-add">
                  <div
                    className="product-order-detail-r-addbasket"
                    onClick={handleAddToBasket}
                    style={{
                      backgroundColor: isInBasket ? "#00ac22" : "#000ca8",
                    }}
                  >
                    {isInBasket ? "Already in Basket" : "Add to Basket"}
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="product-similar">
          <div className="product-similar-name">Similar Products</div>
          {products
            .filter((item) => item.productname === productData.productname)
            .map((product, index) => (
              <div
                className="product-similar-detail"
                key={index}
                onClick={() => {
                  navigate(`/products/id/${product._id}`);
                }}
              >
                <div className="product-similar-detail-l">
                  <div className="product-similar-detail-l-img">
                    <img
                      src={`${baseUrl}/products/${product.productimage}`}
                      alt=""
                    />
                  </div>
                  <div className="product-similar-detail-l-name">
                    <div className="product-similar-detail-l-name-name">
                      {product.productname}
                    </div>
                    <div className="product-similar-detail-l-name-region">
                      {product.region}
                    </div>
                  </div>
                </div>
                <div className="product-similar-detail-r">
                  <div className="product-similar-detail-r-price">
                    {product.productprice} {product.productunit}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer/>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default ProductDetailsPage;
