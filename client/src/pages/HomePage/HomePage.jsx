import React from "react";
import "./style.scss";
import firstslide from "./img/slide1.png";
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
    <div class="container">
    <div class="card">
      <h3 class="title">Card 1</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="stroke" cx="60" cy="60" r="50"/>
      </svg>
      </div>
    </div>
    <div class="card">
      <h3 class="title">Card 2</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="stroke" cx="60" cy="60" r="50"/>
      </svg>
      </div>
    </div>
    <div class="card">
      <h3 class="title">Card 3</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="stroke" cx="60" cy="60" r="50"/>
      </svg>
      </div>
    </div>
    <div class="card">
      <h3 class="title">Card 4</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="stroke" cx="60" cy="60" r="50"/>
      </svg>
      </div>
    </div>
  </div>
    </div>
  </>
  );
};

export default HomePage;
