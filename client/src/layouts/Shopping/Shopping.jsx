import React, { useEffect, useState } from "react";
import "./style.scss";
import { useContext } from "react";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import x from "./img/x.svg";
import plus from "./img/+.png";
import minus from "./img/-.png";
import emptybasket from "./img/emptybasket.jpg";
import deleteicon from "./img/delete.svg";
const Shopping = () => {
  const { openShopping, setOpenShopping, shoppingItems, setShoppingItems,shoppingItemsCount, setShoppingItemsCount } =
    useContext(ShoppingContext);

  const handleRemoveProduct = (productId) => {
    const updatedShoppingItems = shoppingItems.filter(
      (item) => item._id !== productId
    );
    setShoppingItems(updatedShoppingItems);
  };

///////////////////////////////////
  const [updateCount, setUpdateCount] = useState({}); // Ürün sayacını saklamak için state
  useEffect(() => {
    const storedCount = localStorage.getItem("updateCount");
    if (storedCount) {
      setUpdateCount(JSON.parse(storedCount));
    }
  }, []);
  
  // Sayacın localStorage'e kaydedilmesi
  useEffect(() => {
    localStorage.setItem("updateCount", JSON.stringify(updateCount));
  }, [updateCount]);
  const handleUpdateCount = (productId, action) => {
    const updatedCount = { ...updateCount }; // Güncellenmiş sayacı kopyala
    if (action === "plus") {
      updatedCount[productId] = (updatedCount[productId] || 1) + 1;
    } else if (action === "minus") {
      updatedCount[productId] = (updatedCount[productId] || 2) - 1;
    }
    setUpdateCount(updatedCount);
  };
////////////////////////
  const totalPrice = shoppingItems
    .slice(1)
    .reduce(
    (sum, product) =>
    sum + parseFloat(product.productprice) * (updateCount[product._id] || 1),
  0)
    .toFixed(2);
  console.log(updateCount);

  return openShopping ? (
    <div className="Shopping">
      <div className="Shopping-Name">
        <div className="Shopping-Name-Name">
          <div className="Shopping-Name-Name-main">Shopping bag</div>
          <div className="Shopping-Name-Name-count">
            {shoppingItems.length - 1 > 0 ? (
              <>{shoppingItems.length - 1} items</>
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
              {shoppingItems?.map((product) =>
                product._id ? (
                  <div className="Shopping-Detail-Cards-Card" key={product._id}>
                    <div className="Shopping-Detail-Cards-Card-Img">
                      <img
                        src={`http://localhost:5000/products/${product?.productimage}`}
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
                                onClick={() => handleUpdateCount(product._id, "minus")}
                            >
                              -
                            </div>
                            <div className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count-n">
                            {updateCount[product._id] || 1}
                            </div>
                            <div
                              className="Shopping-Detail-Cards-Card-About-Detail-CountDel-count-p"
                              onClick={() => handleUpdateCount(product._id, "plus")}
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
                ) : (
                  <></> //productid
                )
              )}
            </div>

            <div className="Shopping-Detail-Button">
              <div className="Shopping-Detail-Button-Promo">learn about</div>
              <div className="Shopping-Detail-Button-Checkout">
                Check Out - {totalPrice} AZN
              </div>
            </div>
          </>
        ) : (
          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <img className="w-100 h-100" src={emptybasket} alt="Empty" />
            <h1>Your basket is empty</h1>
          </div> //shoppinglength
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Shopping;
