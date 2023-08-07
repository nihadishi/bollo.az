import React from 'react'
import bg_M from "./img/bg2.png";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import AboutPage from '../AboutPage/AboutPage';
const HomePage = () => {
  const navigate = useNavigate();
  return (<>
    <div className="Int">
    <div className="Int-M">
      <img src={bg_M} alt="" />
    </div>
  <div className="Intro">
    
    <div className="Intro-About">
      <div className="Intro-About-Text">Make health life with Fresh grocery</div>
      <div className="Intro-About-Order">
        <button className="Intro-About-Order-button" onClick={()=>{navigate("/products")}}>Order now</button>
      </div>
    </div>
  </div>
</div>
  <AboutPage/></>
  )
}

export default HomePage