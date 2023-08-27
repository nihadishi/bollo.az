import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import "../../index.css";
import slide1 from "./img/slide1.png";
import slide2 from "./img/fruits&vegetables.jpg";
import slide3 from "./img/thirdslide.png";
import liveslide from "./img/fruitsgif.gif";
import bs from "./img/1s.png";
import is from "./img/2s.png";
import us from "./img/3s.png";
import ds from "./img/4s.png";
import statistics from "./img/bro.png";
import firstgirl from "./img/girl.png";
import secondgirl from "./img/girl2.png";
import thirdgirl from "./img/girl3.png";
import probrect from "./img/prob-rect.png";
import { Zoom } from "react-slideshow-image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HoverCarousel from "hover-carousel";
const HomePage = () => {
  // const [slideIndex, setSlideIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  const images = [
    slide1,
    slide2,
    slide3,
    slide1,
    slide2,
    slide3,
    slide1,
    slide2,
    slide3,
    slide1,
    slide2,
    slide3,
    // Add more image URLs here
  ];
  return (
    <div className="Home">
      <div className="Home-intro">
        <div className="Home-intro-div">
          <div className="Home-intro-div-girl">
            <img src={firstgirl} alt="" />
          </div>
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
            If you have one bucket that contains 2 gallons and another bucket
            that contains 7 gallons, how many buckets do you have?
          </p>
        </div>
      </div>
      <div className="categorygallery">
      <HoverCarousel images={images}/>
    </div>
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
  );
};

export default HomePage;
