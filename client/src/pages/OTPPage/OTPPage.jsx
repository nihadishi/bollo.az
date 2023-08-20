import React, { useContext, useEffect, useState } from 'react';
import "./style.scss";
import processingloading from "./img/procesaing.gif";
import { ShoppingFormContext } from '../../assets/context/shopFormContext';
import { LoaderIcon } from 'react-hot-toast';

const OTPPage = () => {
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const [loading, setloading] = useState(true);
    const inputRefs = Array.from({ length: 6 }, () => React.createRef());
    const{shopForm} = useContext(ShoppingFormContext);


    useEffect(() => {
      
    
      const timeout = setTimeout(() => {
        setloading(false);
      }, 3300);
    }, [])
    
    const handleOTPChange = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value.length === 1 && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        !loading?
        <div className="otp-container">
            <h2>Enter 6-Digit OTP Code</h2>
            <h3>We sent to {shopForm.Email}</h3>
            <div className="otp-input">
                {Array.from({ length: 6 }, (_, index) => (
                    <input className='otp-input-text'
                        key={index}
                        type="text"
                        maxLength="1"
                        value={otp[index] || ""}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onFocus={(e) => e.target.select()} // Seçili hale getirme
                        ref={inputRefs[index]}
                    />
                ))}
            </div>
        </div>:
        
        <div className='d-flex align-items-center justify-content-center vh-100 vw-100'> <img src={processingloading} /></div>
    );
};

export default OTPPage;
