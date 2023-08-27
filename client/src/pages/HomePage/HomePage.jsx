import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../layouts/Footer/Footer";
import HoverCarousel from "../../assets/HoverCarousel/HoverCarousel";
import "./style.scss";
import "../../index.css";
import statistics from "./img/bro.png";
import secondgirl from "./img/girl2.png";
import thirdgirl from "./img/girl3.png";
import fruits from "./img/fruits.jpg"
import vegetables from "./img/vegetables.jpg"
import bakery from "./img/bakery.jpg"
import dairy from "./img/dairy.jpg"
import delikatessen from "./img/delikatessen.jpg"
import eggs from "./img/eggs.jpg"
import meat from "./img/meat.jpg"
import pastry from "./img/pastry.jpg"
import poultry from "./img/poultry.jpg"
import savourygrocery from "./img/savourygrocery.jpg"
import { UserContext } from "../../assets/context/userContext";
import Loading from "../../layouts/Loading/Loading";
const HomePage = () => {
  const slideimages = [
    {src: fruits, category : "fruits"},
    {src: vegetables, category : "vegetables"},
    {src: bakery, category : "bakery"},
    {src: dairy, category : "dairy"},
    {src: delikatessen, category : "delikatessen"},
    {src: eggs, category : "eggs"},
    {src: meat, category : "meat"},
    {src: pastry, category : "pastry"},
    {src: poultry, category : "poultry"},
    {src: savourygrocery, category : "savourygrocery"},
  ];
  const { loading, setLoading } = useContext(UserContext);
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
        <div className="Home-intro">
          <div className="Home-intro-div">
            
            <div className="Home-intro-div-left">
              <h1>Tired of spoiled food?</h1>
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
              If you have one bucket that contains 2 gallons and another bucket
              that contains 7 gallons, how many buckets do you have?
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
            We work with many farms to provide you with natural products grown with love and care with no GMO or pesticides.
            </p>
          </div>
        </div>
        <HoverCarousel images={slideimages}/>
        <div className="bestfarmer">
          <div className="bestfarmer-container">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="bestfarmer-card">
                <h3 className="bestfarmer-title">Card {number}</h3>
                <div className="bestfarmer-bar">
                  <div className="bestfarmer-emptybar"></div>
                  <div className="bestfarmer-filledbar"></div>
                </div>
                <div className="bestfarmer-circle">
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
      <Footer/>
      </>
    );
  }
  else{
    return(
      <Loading/>
    )
  }
};

export default HomePage;
