import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import "../../index.css";
import firstslide from "./img/slide1.png";
import secondslide from "./img/fruits&vegetables.jpg";
import liveslide from "./img/fruitsgif.gif";
import bs from "./img/1s.png";
import is from "./img/2s.png";
import us from "./img/3s.png";
import ds from "./img/4s.png";
import { Carousel, initTE } from "tw-elements";
import { Zoom } from "react-slideshow-image";
initTE({ Carousel });
const HomePage = () => {
  return (
    <>
      <div className="categorygallery">
        <div className="categorygalleryslide">
          <img src={firstslide} alt="" />
        </div>
        <div className="categorygallerytext"></div>
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
    </>
  );
};

export default HomePage;
