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
const ProductsPage = () => {
  ////
  // const { Fav, isExist, ToggleFav } = useContext(FavoriutesContext);
  // const [expanded, setExpanded] = useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  ////
  const [products, setProducts] = useState([]);
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const {shoppingItems,setShoppingItems} = useContext(ShoppingContext);
  // const AddShoppingContext = (product) =>{
  //   if(shoppingItems.find(product)){

  //   }
  //   else{
  //     setShoppingItems(...shoppingItems, product)
  //   }

  // }
  const AddShoppingContext = (product) => {
    console.log(product._id);
    console.log(shoppingItems);
    const updatedShoppingItems = [...shoppingItems];
    const index = updatedShoppingItems.findIndex(item => item._id === product._id);
  
    if (index !== -1) {
      // Ürün zaten sepet içinde, çıkar
      updatedShoppingItems.splice(index, 1);
    } else {
      // Ürün sepette yok, ekle
      updatedShoppingItems.push(product);
    }
  
    setShoppingItems(updatedShoppingItems);
  };
  useEffect(() => {
    axios
      .get("/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);
  console.log(shoppingItems);
  if (!loading) {
    return (
      <div className="Products">
        {products.map((product) => (
          <div className="Products-Product" key={product._id}>
            <div className="Products-Product-TypeLike">
              <div className="Products-Product-TypeLike-Type">{product?.producttype === "Fresh"? <div className="Products-Product-TypeLike-Type-Fresh">{product.producttype}</div>: <div className="Products-Product-TypeLike-Type-NotFresh">{product.producttype}</div> }</div>
              <div className="Products-Product-TypeLike-Like"><img src={likeProduct} alt="" /></div>
            </div>
            <div className="Products-Product-Photo">
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
// myProduct = [
//   {
//     id:1,
//     name: "salam",
//     price: "100",
//     rating: "5 5 5 5 5",
//   },
//   {
//     id:2,
//     name: "salam",
//     price: "100",
//     rating: "5 5 5 5 5",
//   },
//   {
//     id:3,
//     name: "salam",
//     price: "100",
//     rating: "5 5 5 5 5",
//   },
//   {
//     id:4,
//     name: "salam",
//     price: "100",
//     rating: "5 5 5 5 5",
//   },
// ]
