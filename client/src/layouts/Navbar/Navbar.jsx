import "./style.scss";
import { useContext, useEffect, useState } from "react";
import Logo from "./img/bollo-logo-gr.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shopicon from "./img/shop-icon.gif";
import { UserContext } from "../../assets/context/userContext";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import Search from "../Search/Search";
import { BlendingContext } from "../../assets/context/blendContext";
const Navbar = () => {
  const { user } = useContext(UserContext);
  const params = useLocation(); 
  const { openShopping, setOpenShopping } = useContext(ShoppingContext);
  const {blending,setBlending} = useContext(BlendingContext);
  const navigate = useNavigate();
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    const navbar = document.querySelector(".Navbar");
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    prevScrollPos = currentScrollPos;
  };
  // console.log(params);
  return (
    <div className={params.pathname == "" || "home" ? "Navbar navbar-home" : "Navbar"} style={{"--blending": blending?"true":"false"}}>
      <div className="Navbar-Nav">
        <div
          className="Navbar-Nav-Logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="Bollo" width={"180px"} />
        </div>
        <div className="Navbar-Nav-Navbar">
          <ul className="Navbar-Nav-Navbar-ul">
            <li
              className="Navbar-Nav-Navbar-ul-li"
              onClick={() => {
                navigate("/products");
              }}
            >
              Products
            </li>
            <li
              className="Navbar-Nav-Navbar-ul-li"
              onClick={() => {
                navigate("/about");
              }}
            >
              About us
            </li>
            <li
              className="Navbar-Nav-Navbar-ul-li"
              onClick={() => {
                setOpenShopping(!openShopping);
              }}
            >
              <img src={shopicon} alt="Liked" />
            </li>
          </ul>
        </div>
        <div className="Navbar-Nav-Search"><Search/></div>
        <div
          className="Navbar-Nav-Contact"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <li className="Navbar-Nav-Contact-li">My Account</li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
