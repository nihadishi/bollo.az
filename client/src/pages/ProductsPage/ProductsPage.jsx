import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import moment from "moment";
import addicon from "./img/add-icon.png";
import minusicon from "./img/added-icon.png";
import notaddedicon from "./img/notaddedicon.png";
import defaultProduct from "./img/default_1.jpg";
import likeProduct from "./img/like.png";
import axios from "axios";
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../layouts/Search/Search";
import { BlendingContext } from "../../assets/context/blendContext";
import FilterProducts from "../../layouts/FilterProducts/FilterProducts";
import ProductLoading from "../../layouts/Loading/ProductLoading";
const ProductsPage = () => {
  const today = new Date();
  const { user, loading, setLoading } = useContext(UserContext);
  const { shoppingItems, setShoppingItems, products } =
    useContext(ShoppingContext);
  const { setBlending } = useContext(BlendingContext);
  const navigate = useNavigate();
  const params = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [OnlySearchFilteredOrAllProducts, setOnlySearchFilteredOrAllProducts] =
    useState([]);
  const [sortType, setSortType] = useState("");
  const AddShoppingContext = (product) => {
    const updatedShoppingItems = [...shoppingItems];
    const index = updatedShoppingItems.findIndex(
      (item) => item._id === product._id
    );
    if (index !== -1) {
      updatedShoppingItems.splice(index, 1);
    } else {
      updatedShoppingItems.push(product);
    }

    setShoppingItems(updatedShoppingItems);
  };
  const handleSortChange = (event) => {
    setSortType(event.target.value); 
  };
  useEffect(() => {
    setLoading(true);
    if (params.searchText) {
      const filtered = products.filter(
        (product) =>
          (product.productname &&
            product.productname
              .toLowerCase()
              .includes(params.searchText.toLowerCase())) ||
          (product.city &&
            product.city
              .toLowerCase()
              .includes(params.searchText.toLowerCase())) ||
          (product.fullname &&
            product.fullname
              .toLowerCase()
              .includes(params.searchText.toLowerCase())) ||
          (product.productcategory &&
            product.productcategory
              .toLowerCase()
              .includes(params.searchText.toLowerCase())) ||
          (product.producttype &&
            product.producttype
              .toLowerCase()
              .includes(params.searchText.toLowerCase()))
      );
      setFilteredProducts(filtered);
      setOnlySearchFilteredOrAllProducts(filtered);
      let sortedProducts = [...filteredProducts];

      if (sortType === "name-asc") {
        sortedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
      } else if (sortType === "name-desc") {
        sortedProducts.sort((a, b) => b.productname.localeCompare(a.productname));
      } else if (sortType === "price-asc") {
        sortedProducts.sort((a, b) => a.productprice - b.productprice);
      } else if (sortType === "price-desc") {
        sortedProducts.sort((a, b) => b.productprice - a.productprice);
      }  else if (sortType === "oldest") {
        sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortType === "newest") {
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
      setFilteredProducts(sortedProducts);
      
    } else {
      setFilteredProducts(products);
      setOnlySearchFilteredOrAllProducts(products);
      let sortedProducts = [...filteredProducts];

      if (sortType === "name-asc") {
        sortedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
      } else if (sortType === "name-desc") {
        sortedProducts.sort((a, b) => b.productname.localeCompare(a.productname));
      } else if (sortType === "price-asc") {
        sortedProducts.sort((a, b) => a.productprice - b.productprice);
      } else if (sortType === "price-desc") {
        sortedProducts.sort((a, b) => b.productprice - a.productprice);
      }  else if (sortType === "oldest") {
        sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortType === "newest") {
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
      setFilteredProducts(sortedProducts); // Sıralanmış ürünleri set et

      
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [params, products,sortType]);
  if (!loading) {
    return (
      <>
        <FilterProducts
          OnlySearchFilteredOrAllProducts={OnlySearchFilteredOrAllProducts}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
        <div
          className="Products"
          onClick={() => {
            setBlending(false);
          }}
        >
          <div className="SortOptions">
            <label htmlFor="sortSelect">Sort:</label>
            <select
              id="sortSelect"
              value={sortType}
              onChange={handleSortChange}
            >
              <option value="">Seçiniz</option>
              <option value="name-asc">İsme Göre (A-Z)</option>
              <option value="name-desc">İsme Göre (Z-A)</option>
              <option value="price-asc">Fiyata Göre Artan</option>
              <option value="price-desc">Fiyata Göre Azalan</option>
              <option value="oldest">Eskiden Yeniye</option>
              <option value="newest">Yeniden Eskiye</option>
            </select>
          </div>
          {filteredProducts.map((product) => {
            const expirationDate = new Date(product.productexpirationdate);
            const freshnessClass =
              expirationDate == "Invalid Date" || expirationDate < today
                ? "invalidProduct"
                : "validProduct";
            // console.log(product);
            // console.log(freshnessClass);
            return (
              <div
                className={`Products-Product ${freshnessClass}`}
                key={product._id}
              >
                <div className="Products-Product-TypeLike">
                  <div className="Products-Product-TypeLike-Type">
                    {product?.producttype === "Fresh" ? (
                      <div className="Products-Product-TypeLike-Type-Fresh">
                        {product.producttype}
                      </div>
                    ) : (
                      <div className="Products-Product-TypeLike-Type-NotFresh">
                        {product.producttype}
                      </div>
                    )}
                  </div>
                  <div className="Products-Product-TypeLike-Like">
                    {moment(product.createdAt).fromNow()}
                  </div>
                </div>
                <div
                  className="Products-Product-Photo"
                  onClick={() => {
                    navigate(`/products/id/${product._id}`);
                  }}
                >
                  {product?.productimage ? (
                    <img
                      src={`http://localhost:5000/products/${product?.productimage}`}
                      alt={product.productname}
                    />
                  ) : (
                    <img src={defaultProduct} />
                  )}
                </div>
                <div className="Products-Product-About">
                  <div className="Products-Product-About-S">
                    <div className="Products-Product-About-S-Name">
                      {product?.productname}
                    </div>
                    <div className="Products-Product-About-S-City">
                      {product?.city}
                    </div>
                    <div className="Products-Product-About-S-Price">
                      {product?.productprice} {product.productunit}
                    </div>
                  </div>
                  {user && user._id === product.userid ? (
                    <div className="Products-Product-About-L">
                      <img src={notaddedicon} alt="Own" />
                    </div>
                  ) : (
                    <div
                      className="Products-Product-About-L"
                      onClick={() => {
                        AddShoppingContext(product);
                      }}
                    >
                      {shoppingItems.some(
                        (item) => item._id === product._id
                      ) ? (
                        <img src={minusicon} alt="-" />
                      ) : (
                        <img src={addicon} alt="+" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <ProductLoading />;
  }
};
export default ProductsPage;
