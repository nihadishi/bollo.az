import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import tomato from "./img/sampletomato.jpeg";
import addicon from "./img/add-icon.png";
import { FavoriutesContext } from "../../assets/context/FavoriutesContext";
import axios from "axios";
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
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

  useEffect(() => {
    // Backend'den ürün verilerini çek

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
  console.log(products);
  if (!loading) {
    return (
      <div className="Products">
        {products.map((product) => (
          <div className="Products-Product" key={product._id}>
            <div className="Products-Product-SaleLike">
              <div className="Products-Product-SaleLike-Sale">20% OFF</div>
              <div className="Products-Product-SaleLike-Like">{/* Burada bir şeyler olması gerekiyor */}</div>
            </div>
            <div className="Products-Product-Photo">
              <img src={`http://localhost:5000/products/${product.productimage}`} alt={product.productname} />
            </div>
            <div className="Products-Product-About">
              <div className="Products-Product-About-S">
                <div className="Products-Product-About-S-Name">{product.productname}</div>
                <div className="Products-Product-About-S-Price">20$</div>
                <div className="Products-Product-About-S-Rating">5 5 5 5 5</div>
              </div>
              <div className="Products-Product-About-L">
                <img src={addicon} alt="+" />
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
