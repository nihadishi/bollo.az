import "./style.scss";
import * as React from "react";
import Logo from "./img/bollo-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    const navbar = document.querySelector(".Navbar");
    let currentScrollPos = window.pageYOffset;
    // console.log(prevScrollPos, currentScrollPos);
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    prevScrollPos = currentScrollPos;
  };

  const navigate = useNavigate();
  return (
    <div className="Navbar">
      <div className="Navbar-Nav">
        <div
          className="Navbar-Nav-Logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="Bollo" />
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
                navigate("/liked");
              }}
            >
              Liked
            </li>
            <li
              className="Navbar-Nav-Navbar-ul-li"
              onClick={() => {
                navigate("/about");
              }}
            >
              About us
            </li>
          </ul>
        </div>
        <div className="Navbar-Nav-Contact">
          <li
            className="Navbar-Nav-Contact-li"
            onClick={() => {
              navigate("/account");
            }}
          >
            My Account
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
