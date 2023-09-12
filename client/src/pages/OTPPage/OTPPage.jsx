import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import processingloading from "./img/procesaing.gif";
import { ShoppingFormContext } from "../../assets/context/shopFormContext";
import { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import OTPLoading from "../../layouts/Loading/OTPLoading";

const OTPPage = () => {
  const [otp, setOTP] = useState([, , , , , ]);
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());
  const { shopForm,loading,setLoading } = useContext(ShoppingFormContext);
  const completeOTP = otp.join(""); 
  const numericOTP = parseInt(completeOTP, 10); 
  const IDCardNumber = shopForm.IDCardNumber
  useEffect(() => {
    setLoading(true);
    const email = localStorage.getItem('shopFormEmail');
   
    if (email) {
      axios.post('/auth/sendEmail', { email, IDCardNumber})
        .then(response => {
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });

      
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4300);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  useEffect(() => {
    const verifyOTP = async () => {
      if (numericOTP > 100000) {
        try {
          const response = await axios.post('/auth/verify', { numericOTP, IDCardNumber });
          console.log(response.data.verified);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    };
  
    verifyOTP();
  }, [numericOTP, IDCardNumber]);


  return !loading ? (
    <div className="otp-container">
      <h2>Enter 6-Digit OTP Code</h2>
      <h3>We sent to {shopForm.Email}</h3>
      <div className="otp-input">
        {Array.from({ length: 6 }, (_, index) => (
          <input
            className="otp-input-text"
            key={index}
            type="text"
            maxLength="1"
            value={otp[index] || ""}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onFocus={(e) => e.target.select()}
            ref={inputRefs[index]}
          />
        ))}
      </div>
    </div>
  ) : (
    <OTPLoading/>
  );
};

export default OTPPage;
