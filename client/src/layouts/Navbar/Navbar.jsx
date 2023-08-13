import "./style.scss";
import { useContext, useEffect } from "react";
import Logo from "./img/bollo-logo-gr.png";
import { useNavigate } from "react-router-dom";
import shopicon from "./img/shop-icon.gif"
import { UserContext } from "../../assets/context/userContext";
const Navbar = () => {
  const {user} = useContext(UserContext)

  const navigate = useNavigate();
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
  
  return (
    <div className="Navbar">
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
                navigate("/liked");
              }}
            >
              <img src={shopicon} alt="Liked" />
            </li>
          </ul>
        </div>
        <div className="Navbar-Nav-Contact">
          {/* <img src={user?.image} alt="dfghjklkjhg" /> */}
          <li
            className="Navbar-Nav-Contact-li"
            onClick={() => {
              navigate("/profile");
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
