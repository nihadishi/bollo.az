import React from "react";
import "./style.scss";
const Loading = () => {
  return (
    <div className="container">
    <div className="loader">
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--text"></div>
    </div>
  </div>
  );
};

export default Loading;
