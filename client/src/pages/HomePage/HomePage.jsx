import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../layouts/Footer/Footer";
import HoverCarousel from "../../assets/HoverCarousel/HoverCarousel";
import "./style.scss";
import "../../index.css";
import statistics from "./img/bro.png";
import secondgirl from "./img/girl2.png";
import thirdgirl from "./img/girl3.png";
import fruits from "./img/fruits.jpg";
import vegetables from "./img/vegetables.jpg";
import bakery from "./img/bakery.jpg";
import dairy from "./img/dairy.jpg";
import delikatessen from "./img/delikatessen.jpg";
import eggs from "./img/eggs.jpg";
import meat from "./img/meat.jpg";
import pastry from "./img/pastry.jpg";
import poultry from "./img/poultry.jpg";
import savourygrocery from "./img/savourygrocery.jpg";
import slide1 from "./img/1.jpg";
import slide2 from "./img/2.jpg";
import slide3 from "./img/3.jpg";
import slide4 from "./img/4.jpg";
import slide5 from "./img/5.jpg";
import slide6 from "./img/6.jpg";
import slide7 from "./img/7.jpg";
import slide8 from "./img/8.jpg";
import slide9 from "./img/9.jpg";
import slide10 from "./img/10.jpg";
import slide11 from "./img/11.jpg";
import slide12 from "./img/12.jpg";
import slide13 from "./img/13.jpg";
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const categoryslideimage = [
    { src: fruits, category: "fruits" },
    { src: vegetables, category: "vegetables" },
    { src: bakery, category: "bakery" },
    { src: dairy, category: "dairy" },
    { src: delikatessen, category: "delikatessen" },
    { src: eggs, category: "eggs" },
    { src: meat, category: "meat" },
    { src: pastry, category: "pastry" },
    { src: poultry, category: "poultry" },
    { src: savourygrocery, category: "savourygrocery" },
  ];
  const slideimage = [
    { src: slide1, category: "" },
    { src: slide2, category: "" },
    { src: slide3, category: "" },
    { src: slide4, category: "" },
    { src: slide5, category: "" },
    { src: slide6, category: "" },
    { src: slide7, category: "" },
    { src: slide8, category: "" },
    { src: slide9, category: "" },
    { src: slide10, category: "" },
    { src: slide11, category: "" },
    { src: slide12, category: "" },
    { src: slide13, category: "" },
  ];
  const featuresSlide = [
    {number:1, text:"Farm products"},
    {number:2, text:"High quality"},
    {number:3, text:"Free delivery"},
    {number:4, text:"Easy to use"},
  ]
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);
  if (!loading) {
    return (
      <>
        <div className="Home">
          <div className="Home-slides">
            <div style={{ animationDelay: "0s" }}>
              <img src={slideimage[0].src} />
            </div>
            <div style={{ animationDelay: "4s" }}>
              <img src={slideimage[1].src} />
            </div>
            <div style={{ animationDelay: "8s" }}>
              <img src={slideimage[2].src} />
            </div>
            <div style={{ animationDelay: "12s" }}>
              <img src={slideimage[3].src} />
            </div>
          </div>
          <div className="Home-intro">
            <div className="Home-intro-div">
              <div className="Home-intro-div-left">
                <h1>Tired of spoiled food?</h1>
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                  dolorum necessitatibus aut exercitationem sit nostrum deserunt
                  assumenda aliquam expedita perspiciatis, reiciendis, soluta
                  rem debitis nobis tempora suscipit alias atque facilis.
                </h5>
              </div>
              <div className="Home-intro-div-right">
                <img src={statistics} alt="" />
              </div>
            </div>
          </div>
          <div className="Home-prob">
            <div className="Home-prob-l">
              <h1 className="Home-prob-l-h1">
                <div className="Home-prob-l-h1-h2">what is our problem?</div>
                <img src={secondgirl} alt="" className="Home-prob-l-h1-img" />
              </h1>
            </div>
            <div className="Home-prob-r">
              <p className="Home-prob-r-p">
                If you have one bucket that contains 2 gallons and another
                bucket that contains 7 gallons, how many buckets do you have?
              </p>
            </div>
          </div>
          <div className="Home-sol">
            <div className="Home-sol-l">
              <h1 className="Home-sol-l-h1">
                <div className="Home-sol-l-h1-h2">the solution</div>
                <img src={thirdgirl} alt="" className="Home-sol-l-h1-img" />
              </h1>
            </div>
            <div className="Home-sol-r">
              <p className="Home-sol-r-p">
                We work with many farms to provide you with natural products
                grown with love and care with no GMO or pesticides.
              </p>
            </div>
          </div>
          <HoverCarousel images={categoryslideimage} />
          <div className="bestfarmer">
            <div className="bestfarmer-container">
              {featuresSlide.map((number) => (
                <div key={number.number} className="bestfarmer-card">
                  <h3 className="bestfarmer-title">Features {number.number}</h3>
                  <div className="bestfarmer-bar">
                    <div className="bestfarmer-emptybar"></div>
                    <div className="bestfarmer-filledbar"></div>
                  </div>
                  <div className="bestfarmer-circle">
                  <div className="bestfarmer-text" style={{color:"white",fontWeight:"600"}} onClick={()=>{navigate("/about")}}>{number.text}</div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                     
                      <circle
                        className="bestfarmer-stroke"
                        cx="60"
                        cy="60"
                        r="50"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
};

export default HomePage;
