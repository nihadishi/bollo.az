import React, { useEffect, useState } from "react";
import "./style.scss";
import { useContext } from "react";
import { UserContext } from "../../assets/context/userContext";
import CardLoading from "../../layouts/Loading/CardLoading";
import { Navigate, useNavigate } from "react-router-dom";
import ProductsPage from "../ProductsPage/ProductsPage";
import { TotalPriceContext } from "../../assets/context/TotalPriceContext";
import { ShoppingFormContext } from "../../assets/context/shopFormContext";
import axios from "axios";
import OTPLoading from "../../layouts/Loading/OTPLoading";
import { toast } from "react-hot-toast";

const PaymentPage = ({ isAuth }) => {
  const { loading: userLoading, setLoading: setUserLoading } =
    useContext(UserContext);
  const { totalPriceCont } = useContext(TotalPriceContext);
  const { shopForm, loading: customerLoading, setLoading: setCustomerLoading  } = useContext(ShoppingFormContext);
  const [redirect, setRedirect] = useState(false);
  const minutes = 3;
  const [remainingMinutes, setRemainingMinutes] = useState(minutes);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [cardName, setCardName] = useState(
    shopForm?.Name + " " + shopForm?.Surname
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setCustomerLoading(false)
    setUserLoading(true);
    const timeout = setTimeout(() => {
      setUserLoading(false);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setRedirect(true);
    }, minutes * 60 * 1000);

    const endTime = new Date().getTime() + minutes * 60 * 1000 - 1000; // End time is calculated here
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;
      const remainingMinutes = Math.floor(remainingTime / (60 * 1000));
      const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
      setRemainingMinutes(remainingMinutes);
      setRemainingSeconds(remainingSeconds);

      if (remainingTime < 10) {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(interval);
    };
  }, []);

  const isValidCardName = (name) => {
    return name.length >= 3;
  };

  const isValidCardNumber = (number) => {
    return number.length === 16 && /^\d+$/.test(number);
  };

  const isValidExpirationDate = (date) => {
    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear() % 100;
    return (
      /^\d{2}\/\d{2}$/.test(date) &&
      parseInt(month) >= 1 &&
      parseInt(month) <= 12 &&
      parseInt(year) >= currentYear &&
      parseInt(year) <= currentYear + 10
    );
  };

  const isValidSecurityCode = (code) => {
    return code.length === 3 && /^\d+$/.test(code);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value.replace(/\D/g, "");
    if (inputCardNumber.length <= 16) {
      setCardNumber(inputCardNumber);
    }
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleSecurityCodeChange = (event) => {
    const inputSecurityCode = event.target.value.replace(/\D/g, "");
    if (inputSecurityCode.length <= 3) {
      setSecurityCode(inputSecurityCode);
    }
  };

  const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1-").slice(0, -1);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cardNumber.length === 16 &&
      securityCode.length === 3 &&
      /^([01][0-9]|2[0-3])\/[2-9][0-9]$/.test(expirationDate)
    ) {
      setCustomerLoading(true);
      await axios
        .post("/customer/add", { shopForm })
        .then((res) => {
          console.log("THENNN");
          navigate("/3dsecure.azericard/auth");
          setCustomerLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Server error");
          setCustomerLoading(false);
        });
    } else {
      toast.error("Write required parts.");
      setCustomerLoading(false)
    }
  };

  if (isAuth) {
    if (customerLoading) {
      return <OTPLoading />;
    } else if (!userLoading) {
      return (
        <>
          {redirect ? (
            <Navigate to="/products" replace />
          ) : (
            <div className="PaymentPage">
              <form onSubmit={handleSubmit} className="Form">
                <div>
                  <label htmlFor="cardName">Cardholder's Name:</label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={handleCardNameChange}
                    required
                    className={`input-field ${
                      cardName
                        ? isValidCardName(cardName)
                          ? "valid"
                          : "invalid"
                        : ""
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength="16"
                    required
                    className={`input-field ${
                      cardNumber
                        ? isValidCardNumber(cardNumber)
                          ? "valid"
                          : "invalid"
                        : ""
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="expirationDate">
                    Expiration Date (MM/YY):
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    maxLength="5"
                    placeholder="MM/YY"
                    required
                    className={`input-field ${
                      expirationDate
                        ? isValidExpirationDate(expirationDate)
                          ? "valid"
                          : "invalid"
                        : ""
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="securityCode">Security Code:</label>
                  <input
                    type="password"
                    id="securityCode"
                    value={securityCode}
                    onChange={handleSecurityCodeChange}
                    maxLength="3"
                    required
                    className={`input-field ${
                      securityCode
                        ? isValidSecurityCode(securityCode)
                          ? "valid"
                          : "invalid"
                        : ""
                    }`}
                  />
                </div>
                <button type="submit" className="Payment-submit">
                  Pay {totalPriceCont} AZN
                </button>
                <div className="countdown">
                  Remaining Time: {remainingMinutes} min {remainingSeconds} sec
                </div>
              </form>
              <div className="credit-card-wrap">
                <div className="mk-icon-world-map"></div>
                <div className="credit-card-inner">
                  <header className="header">
                    <div className="credit-logo">
                      <div className="shape">
                        <span className="txt">IBA</span>
                      </div>
                      <span className="text">
                        International Bank of Azerbaijan
                      </span>
                    </div>
                  </header>
                  <div className="mk-icon-sim"></div>
                  <div className="credit-font credit-card-number">
                    {formattedCardNumber}
                  </div>
                  <footer className="footer">
                    <div className="clearfix">
                      <div className="pull-left">
                        <div className="credit-card-date">
                          <span className="title">Expires End</span>
                          <span className="credit-font">{expirationDate}</span>
                        </div>
                        <div className="credit-font credit-author">
                          {cardName}
                        </div>
                      </div>
                      <div className="pull-right">
                        <div className="mk-icon-visa">
                          <span className="securityCode">{securityCode}</span>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return <CardLoading />;
    }
  } else {
    return <Navigate to="/products" replace />;
  }
};

export default PaymentPage;
