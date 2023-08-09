import React, { useContext, useState } from 'react'
import "./style.scss"
import tomato from "./img/sampletomato.jpeg"
import addicon from "./img/addicon.gif"
import { FavoriutesContext } from '../../assets/context/FavoriutesContext'
const ProductsPage = () => {
  ////
  // const { Fav, isExist, ToggleFav } = useContext(FavoriutesContext);
  // const [expanded, setExpanded] = useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  ////
  return (
    <div className="Products">
      <div className="Products-Product">
        <div className="Products-Product-SaleLike">
          <div className="Products-Product-SaleLike-Sale">20% OFF</div>
          <div className="Products-Product-SaleLike-Like">{}</div>
        </div>
        <div className="Products-Product-Photo">
          <img src={tomato} alt="Tomato" />
        </div>
        <div className="Products-Product-About">
          <div className="Products-Product-About-S">
            <div className="Products-Product-About-S-Name">Tomato</div>
            <div className="Products-Product-About-S-Price">20$</div>
            <div className="Products-Product-About-S-Rating">5 5 5 5 5</div>
          </div>
          <div className="Products-Product-About-L"><img src={addicon} alt="+" /></div>
        </div>

      </div>
    </div>
  )
}

export default ProductsPage
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