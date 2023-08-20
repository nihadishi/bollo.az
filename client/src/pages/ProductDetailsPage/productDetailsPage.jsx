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
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const productID = useParams();
  const { shoppingItems, setShoppingItems, products, setProducts } =
    useContext(ShoppingContext);
    const {user} = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/products/id/${productID.productID}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      })
      .finally(() => {
        setLoading(false)
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
      <div className="product">
        <div className="product-details">
          <div className="product-image">
            <img
              src={`http://localhost:5000/products/${productData.productimage}`}
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
                  backgroundColor:
                    productData.producttype === "Fresh" ? "#00ac22" : "#f7d1b5",
                }}
              >
                {productData.producttype}
              </div>
            </div>
            <div className="product-info-details">
              <div className="product-info-details-general">
                <div>{productData.fullname}</div>
                <div
                  onClick={() => {
                    handleMapLinkClick(productData.city);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {productData.city}, {productData.region}
                </div>
                <div>
                  {productData.productexpirationdate}
                </div>
              </div>
              <div className="product-info-details-description">
                <div>{productData.productdescription}</div>
              </div>
            </div>
          </div>
          <div className="product-order">
            <div className="product-order-detail">
              <div className="product-order-detail-l">
                <div className="product-order-detail-l-img">
                  <img
                    src={`http://localhost:5000/products/${productData.productimage}`}
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
                  {
                     user && user._id === productData.userid ? <div className="product-order-detail-r-addbasket" style={{backgroundColor:"#7F7F7F"}}>It's your Product</div>:
                     <div
                     className="product-order-detail-r-addbasket"
                     onClick={handleAddToBasket}
                     style={{
                       backgroundColor: isInBasket ? "#00ac22" : "#000ca8",
                     }}
                   >
                     {isInBasket ? "Already in Basket" : "Add to Basket"}
                   </div>
                  }
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
                      src={`http://localhost:5000/products/${product.productimage}`}
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
    );
  } else {
    return <Loading />;
  }
};

export default ProductDetailsPage;
