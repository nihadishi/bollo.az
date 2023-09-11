import "./style.scss";
import { useContext, useEffect, useState } from "react";
import Logo from "./img/bollo-logo-gr.png";
import menuLogo_M from "./img/menuLogo-M.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shopicon from "./img/shop-icon.gif";
import { UserContext } from "../../assets/context/userContext";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import Search from "../Search/Search";
import { BlendingContext } from "../../assets/context/blendContext";
const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocation();
  const { openShopping, setOpenShopping } = useContext(ShoppingContext);
  const { blending, setBlending } = useContext(BlendingContext);
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
  return (
    <>
    <div className="Navbar navbar-home">
      <div className="Navbar-Nav">
        <div
          className="Navbar-Nav-Logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="Bollo"  />
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
            <div className="Navbar-Nav-Search">
              <Search />
            </div>
            <div
              className="Navbar-Nav-Contact"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <li className="Navbar-Nav-Contact-li">My Account</li>
            </div>
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
      </div>
      <div className="Nav-M">
        {
          <>
            <div className="Nav-M-Logo" onClick={()=>{navigate("/")}}>
              <img src={Logo} alt="Bollo" />
            </div>
            <div className="Nav-M-Search"><Search /></div>
            <li
              className="Navbar-Nav-Navbar-ul-li"
              onClick={() => {
                setOpenShopping(!openShopping);
              }}
            >
              <img src={shopicon} alt="Liked" />
            </li>
            <div
              className="Nav-M-menuLogo"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src={menuLogo_M} alt="Menu" />
            </div>
          </>
        }
      </div>
    </div>
    {isOpen ? (
        <div className="OpenMenu">
          <div className="OpenMenu-Nav-M">
            <div
              className="OpenMenu-Nav-M-menuLogo"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src={menuLogo_M} alt="Menu" />
            </div>
          </div>
          <div className="OpenMenu-AllItems">
            <div className="OpenMenu-AllItems-Logo">
              <img src={Logo} alt="Bollo" />
            </div>
            <div className="OpenMenu-AllItems-Items">
              <div
                className="OpenMenu-AllItems-Items-Item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/")
                }}
              >
                Home
              </div>
              <div
                className="OpenMenu-AllItems-Items-Item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/products")
                }}
              >
                Products
              </div>
              <div
                className="OpenMenu-AllItems-Items-Item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/about")
                }}
              >
                About
              </div>
              <div
                className="OpenMenu-AllItems-Items-Item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile")
                }}
              >
                My Account
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
