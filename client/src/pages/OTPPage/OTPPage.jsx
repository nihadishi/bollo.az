import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import processingloading from "./img/procesaing.gif";
import { ShoppingFormContext } from "../../assets/context/shopFormContext";
import { LoaderIcon, toast } from "react-hot-toast";
import axios from "axios";
import OTPLoading from "../../layouts/Loading/OTPLoading";
import { useNavigate } from "react-router-dom";
// import { otpValue } from "../../../../server/src/services/generateOTP";

const OTPPage = () => {
  const [otp, setOTP] = useState([, , , , ,]);
  const [verified, setverified] = useState(false);
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());
  const { shopForm, loading, setLoading } = useContext(ShoppingFormContext);
  const completeOTP = otp.join("");
  const numericOTP = parseInt(completeOTP, 10);
  const IDCardNumber = shopForm.IDCardNumber;
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const email = localStorage.getItem("shopFormEmail");

    if (email) {
      axios
        .post("/auth/sendEmail", { email, IDCardNumber })
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
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
          const response = await axios.post("/auth/verify", {
            numericOTP,
            IDCardNumber,
          });
          console.log(response.data.verified);
          if (response.data.verified) {
            setverified(true);
            let orderedProducts = localStorage.getItem("shoppingItems");
            // orderedProducts.slice(0).map((product) => {
            //   if (product.userid) {
            //     axios.put(`/profile/order/${product.userid}`, product);
            //   }
            // });
            // try {
            //   const sendData = await axios.post("/auth/sendEmail", { orderedProducts })

            //   toast.success("Successful")
            // } catch (error) {
            //   console.error(error);
            //   setverified(false);
            //   setLoading(false);
            // }
          } else {
            setverified(false);
            if (numericOTP > 100000) {
              toast.error("False OTP Code");
            }
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setverified(false);
          setLoading(false);
        }
      }
    };

    verifyOTP();
  }, [numericOTP, IDCardNumber, verified]);

  if (!verified) {
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
      <OTPLoading />
    );
  } else {
    return (
      <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
        <MDBModalDialog>
          <MDBModalContent style={{ margin: "20px" }}>
            <MDBModalHeader>
              <MDBModalTitle
                style={{ color: "green", fontSize: "28px" }}
                className="d-flex align-items-center justify-content-center"
              >
                Your order has been accepted.
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody
              style={{ color: "gray" }}
              className="d-flex align-items-center justify-content-center"
            >
              If you have any more questions or need further assistance, feel
              free to ask.
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                style={{ height: "40px", margin: "20px" }}
                color="secondary"
                onClick={() => {
                  navigate("/products");
                }}
              >
                Okay
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </div>
    );
  }
};

export default OTPPage;
