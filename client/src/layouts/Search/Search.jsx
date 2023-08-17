import React, { useContext, useState } from "react";
import "./style.scss";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlendingContext } from "../../assets/context/blendContext";

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useContext(ShoppingContext);
  const {blending, setBlending} = useContext(BlendingContext);

  useEffect(() => {
    const filtered = products.filter((product) =>
      (product.productname.toLowerCase().includes(searchText.toLowerCase())) ||
      product.city.toLowerCase().includes(searchText.toLowerCase()) ||
      product.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      product.productcategory.toLowerCase().includes(searchText.toLowerCase()) ||
      product.producttype.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText,blending]);

  return (
    
    <div className="src">
        {/* {searchText ? setBlending(true):setBlending(false)} */}
      <input
        type="text"
        className="src-input"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={()=>{setBlending(true)}}
       
      />
      {blending && searchText && (
        <div className="src-products" onBlur={()=>{setBlending(false)}}>
          {filteredProducts.slice(0, 3).map((filtered, index) => (
            <div
              className="src-products-product"
              key={index}
              onClick={() => {
                navigate(`/products/id/${filtered._id}`);
              }}
            >
              <div className="src-products-product-detail">
                <div className="src-products-product-detail-l">
                  <div className="src-products-product-detail-l-img">
                    <img
                      src={`http://localhost:5000/products/${filtered.productimage}`}
                      alt=""
                    />
                  </div>
                  <div className="src-products-product-detail-l-name">
                    <div className="src-products-product-detail-l-name-name">
                      {filtered.productname}
                    </div>
                    <div className="src-products-product-detail-l-name-region">
                      {filtered.region}
                    </div>
                  </div>
                </div>
                <div className="src-products-product-detail-r">
                  <div className="src-products-product-detail-r-price">
                    {filtered.productprice}
                  </div>
                  <div className="src-products-product-detail-r-price">
                    {filtered.productunit}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* {filteredProducts.length > 3 && ( */}
            <div className="see-all"><Link to={`/products/search/${searchText}`} onClick={()=>setBlending(false)}>See All</Link></div>
          {/* )} */}
        </div>
       )} 
    </div>
  );
};

export default Search;
