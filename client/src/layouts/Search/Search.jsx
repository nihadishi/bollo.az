import React, { useContext, useState } from "react";
import "./style.scss";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlendingContext } from "../../assets/context/blendContext";
import startvoiceicon from "./img/icons8-voice-recorder-b.png";
import stopvoiceicon from "./img/icons8-voice-recorder-red.png";

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [voiceIsOpen, setVoiceIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  let recognition = null;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useContext(ShoppingContext);
  const { blending, setBlending } = useContext(BlendingContext);

  useEffect(() => {
    setSearchText(searchText.trim());
    const filtered = products.filter(
      (product) =>
        product.productname.toLowerCase().includes(searchText.toLowerCase()) ||
        product.city.toLowerCase().includes(searchText.toLowerCase()) ||
        product.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
        product.productcategory
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        product.producttype.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, blending]);

  useEffect(() => {
    if (voiceIsOpen) {
      setSearchText("");
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];
        if (result.isFinal) {
          setTranscript(result[0].transcript);
          setSearchText(result[0].transcript);
          // setSearchText(transcript);
        }
      };
      recognition.start();
    } else if (recognition) {
      recognition.stop();
    }
    const timeoutId = setTimeout(() => {
      setVoiceIsOpen(false)
    }, 5000);
    setRemainingTime(5000);
    const countdownInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 40);
    }, 40);

    return () => {
      if (recognition) {
        recognition.stop();
      }
      clearTimeout(timeoutId);
      clearInterval(countdownInterval);
    };
  }, [voiceIsOpen]);

  const toggleVoice = () => {
    setVoiceIsOpen(!voiceIsOpen);
  };
  return (
    <div className="d-flex flex-row">
      <div className="src">
        <input
          type="text"
          className="src-input"
          placeholder="  Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => {
            setBlending(true);
          }}
        />

        {blending && searchText && (
          <div
            className="src-products"
            onBlur={() => {
              setBlending(false);
            }}
          >
            {filteredProducts.slice(0, 3).map((filtered, index) => (
              <div
                className="src-products-product"
                key={index}
                onClick={() => {
                  navigate(`/products/id/${filtered._id}`);
                }}
              >
                <div className="src-products-product-detail">
                  <div className="src-products-product-detail-l">
                    <div className="src-products-product-detail-l-img">
                      <img
                        src={`http://localhost:5000/products/${filtered.productimage}`}
                        alt=""
                      />
                    </div>
                    <div className="src-products-product-detail-l-name">
                      <div className="src-products-product-detail-l-name-name">
                        {filtered.productname}
                      </div>
                      <div className="src-products-product-detail-l-name-region">
                        {filtered.region}
                      </div>
                    </div>
                  </div>
                  <div className="src-products-product-detail-r">
                    <div className="src-products-product-detail-r-price">
                      {filtered.productprice}
                    </div>
                    <div className="src-products-product-detail-r-price">
                      {filtered.productunit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* {filteredProducts.length > 3 && ( */}
            <div className="see-all">
              <Link
                to={`/products/search/${searchText}`}
                onClick={() => setBlending(false)}
              >
                See All
              </Link>
            </div>
            {/* )} */}
          </div>
        )}
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        onClick={toggleVoice}
      >
        <img
          src={voiceIsOpen ? stopvoiceicon : startvoiceicon}
          alt=""
          width={"30px"}
          height={"30px"}
        /> {voiceIsOpen && <p> 0.{remainingTime} sec</p>}
      </div>
    </div>
  );
};

export default Search;
