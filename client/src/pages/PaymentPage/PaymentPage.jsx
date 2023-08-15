import React, { useEffect, useState } from "react";
import "./style.scss";
import { useContext } from "react";
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
import abblogo from "./img/ABB_Logo.png";

const PaymentPage = () => {
  const { loading, setLoading } = useContext(UserContext);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      cardNumber.length === 16 &&
      securityCode.length === 3 &&
      /^([01][0-9]|2[0-3])\/[2-9][0-9]$/.test(expirationDate)
    ) {
      alert("Kart bilgileri geçerli!");
    } else {
      alert("Lütfen geçerli kart bilgileri girin.");
    }
  };

  if (!loading) {
    return (
      <div className="PaymentPage">
        <form onSubmit={handleSubmit} className="Form">
          <div>
            <label htmlFor="cardName">Kart Sahibinin Adı:</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={handleCardNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Kart Numarası:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="16"
              required
            />
          </div>
          <div>
            <label htmlFor="expirationDate">Son Kullanma Tarihi (MM/YY):</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              maxLength="5"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="securityCode">Güvenlik Kodu:</label>
            <input
              type="password"
              id="securityCode"
              value={securityCode}
              onChange={handleSecurityCodeChange}
              maxLength="3"
              required
            />
          </div>
          <button type="submit">Ödeme Yap</button>
        </form>
        <div className="credit-card-wrap">
          <div className="mk-icon-world-map"></div>
          <div className="credit-card-inner">
            <header className="header">
              <div className="credit-logo">
                <div className="shape">
                  <span className="txt">IBA</span>
                </div>
                <span className="text">International Bank of Azerbaijan</span>
              </div>
            </header>
            <div className="mk-icon-sim"></div>
            <div className="credit-font credit-card-number" data-text="4716">
              {formattedCardNumber}
            </div>
            <footer className="footer">
              <div className="clearfix">
                <div className="pull-left">
                  <div className="credit-card-date">
                    <span className="title">Expires End</span>
                    <span className="credit-font">01/018</span>
                  </div>
                  <div className="credit-font credit-author">{cardName}</div>
                </div>
                <div className="pull-right">
                  <div className="mk-icon-visa"></div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default PaymentPage;
