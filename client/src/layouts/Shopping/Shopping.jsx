import React, { useEffect, useState } from "react";
import "./style.scss";
import { useContext } from "react";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import x from "./img/x.svg";
import plus from "./img/+.png";
import minus from "./img/-.png";
import emptybasket from "./img/emptybasket.jpg";
import deleteicon from "./img/delete.svg";
import { useNavigate } from "react-router-dom";
import { TotalPriceContext } from "../../assets/context/TotalPriceContext";
import Shopform from "../ShopForm/Shopform";
import { ShoppingFormContext } from "../../assets/context/shopFormContext";
import { BackendUrlContext} from "../../assets/context/backendUrlContext";
const Shopping = () => {
  const { openShopping, setOpenShopping, shoppingItems, setShoppingItems } =
    useContext(ShoppingContext);
    const {totalPriceCont,setTotalPriceCont} = useContext(TotalPriceContext);
    const {shopForm,setShopForm} = useContext(ShoppingFormContext);
    const {baseUrl} = useContext(BackendUrlContext);
    const navigate = useNavigate();
    const [openShopForm,setOpenShopForm] = useState(false);
    const handleRemoveProduct = (productId) => {
    const updatedShoppingItems = shoppingItems.filter(
      (item) => item._id !== productId
    );
    const updatedUpdateCount = { ...updateCount };
    delete updatedUpdateCount[productId];
    setUpdateCount(updatedUpdateCount);
    
    setShoppingItems(updatedShoppingItems);
    localStorage.setItem("shoppingItems", JSON.stringify(updatedShoppingItems));
    localStorage.setItem("updateCount", JSON.stringify(updatedUpdateCount));
  };

  ///////////////////////// local storage
  const [updateCount, setUpdateCount] = useState(() => {
    const storedCount = localStorage.getItem("updateCount");
    if (storedCount) {
      return JSON.parse(storedCount);
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("updateCount", JSON.stringify(updateCount));
  }, [updateCount]);
  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
  }, [shoppingItems]);
  ////////////////////////

  const handleUpdateCount = (productId, action) => {
    const updatedCount = { ...updateCount }; // Güncellenmiş sayacı kopyala
    if (action === "plus") {
      updatedCount[productId] = (updatedCount[productId] || 1) + 1;
    } else if (action === "minus") {
      updatedCount[productId] = (updatedCount[productId] || 2) - 1;
    }
    setUpdateCount(updatedCount);
    localStorage.setItem("updateCount", JSON.stringify(updatedCount));
  };
  
  const totalPrice = shoppingItems
    .slice(1)
    .reduce(
      (sum, product) =>
        sum +
        parseFloat(product.productprice) * (updateCount[product._id] || 1),
      0
    )
    .toFixed(2);

  const handleShoppingClick = () => {
    navigate("/3dsecure.azericard/payment")
    setOpenShopping(false)
    setTotalPriceCont(totalPrice)
  }
  return openShopping ? (
    <div className="Shopping">
     {
      !openShopForm ?
      <>
      <div className="Shopping-Name">
        <div className="Shopping-Name-Name">
          <div className="Shopping-Name-Name-main">Shopping bag</div>
          <div className="Shopping-Name-Name-count">
            {shoppingItems.length - 1 > 0 ? (
              <>({shoppingItems.length - 1} items)</>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="Shopping-Name-X">
          <img
            src={x}
            alt="x"
            onClick={() => {
              setOpenShopping(false);
            }}
          />
        </div>
      </div>
      <div className="Shopping-Detail">
        {shoppingItems.length > 1 ? (
          <>
            <div className="Shopping-Detail-Cards">
              {shoppingItems?.map((product,index) =>
                product._id ? (
                  <div className="Shopping-Detail-Cards-Card" key={index} >
                    <div className="Shopping-Detail-Cards-Card-Img">
                      <img
                        src={`${baseUrl}/products/${product?.productimage}`}
                        alt={product.productname}
                      />
                    </div>
                    <div className="Shopping-Detail-Cards-Card-About">
                      <div className="Shopping-Detail-Cards-Card-About-Product">
                        <div className="Shopping-Detail-Cards-Card-About-Product-name">
                          {product?.productname}
                        </div>
                        <div className="Shopping-Detail-Cards-Card-About-Product-price">
                          {product?.productprice} {product?.productunit}
                        </div>
                      </div>
                      <div className="Shopping-Detail-Cards-Card-About-Detail">
                        <div className="Shopping-Detail-Cards-Card-About-Detail-name">
                          {product?.fullname} ({product?.city})
                        </div>
                        <div className="Shopping-Detail-Cards-Card-About-Detail-CountDel">
                          <div className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count">
                            <div
                              className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count-m"
                              onClick={() =>
                                handleUpdateCount(product._id, "minus")
                              }
                            >
                              -
                            </div>
                            <div className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count-n">
                              {updateCount[product._id] || 1}
                            </div>
                            <div
                              className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count-p"
                              onClick={() =>
                                handleUpdateCount(product._id, "plus")
                              }
                            >
                              +
                            </div>
                          </div>
                          <div
                            className="Shopping-Detail-Cards-Card-About-Detail-CountDel-delete"
                            onClick={() => handleRemoveProduct(product._id)}
                          >
                            <img src={deleteicon} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : 
                  <div key={index}></div>
                
              )}
            </div>

            <div className="Shopping-Detail-Button">
              <div className="Shopping-Detail-Button-AddDetail" onClick={()=>{setOpenShopForm(!openShopForm)}}>Add your Detail</div>     
            </div>
          </>
        ) : (
          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <img className="w-100 h-100" src={emptybasket} alt="Empty" />
            <h1>Your basket is empty</h1>
          </div> //shoppinglength
        )}
      </div>
      </>:
      <>
      <Shopform setOpenShopForm={setOpenShopForm}/>
      {shopForm.Name && shopForm.Surname && shopForm.Email && shopForm.IDCardNumber && shopForm.Number && shopForm.Country && shopForm.City && shopForm.Street && shopForm.ZipCode && <div className="Shopping-Detail-Button-Checkout" onClick={handleShoppingClick}>
        Check Out - {totalPrice} AZN
      </div>}</>
     }
    </div>
  ) : (
    <></>
  );
};

export default Shopping;
