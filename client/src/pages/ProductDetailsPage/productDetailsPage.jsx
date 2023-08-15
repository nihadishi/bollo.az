import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState({});
  const productID = useParams();; // Ürününüzün ID'sini buraya ekleyin
  console.log(productID);
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/id/${productID.productID}`)
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, []);

  return (
    <div className="product-details m-5 p-5">
      <div className="product-image">
        <img src={productData.productimage} alt={productData.productname} />
      </div>
      <div className="product-info">
        <h2>{productData.productname}</h2>
        <p>{productData.productdescription}</p>
        <p>Price: {productData.productprice} {productData.productunit}</p>
        <p>Category: {productData.productcategory}</p>
        <p>Type: {productData.producttype}</p>
        <p>Seller: {productData.fullname}</p>
        <p>Region: {productData.region}</p>
        <p>City: {productData.city}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
