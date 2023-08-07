import React from 'react'
import "./style.scss"
import instagram from "./img/instagram.png"
import facebook from "./img/facebook.png"
import youtube from "./img/youtube.png"
const Footer = () => {
  return (
    <div className="Foo">
        <div className="Footer">
          <div className="Footer-Contact">
            <div className='Footer-Contact-Name'>Contact:</div>
          <div className="Footer-Contact-Left">
            <h3>Email: nihadnm@code.edu.az</h3>
            <h3>Phone Number: +994-77-637-38-38</h3>
          </div>
          <div className="Footer-Contact-Right">
            <h3><a href="https://www.apple.com/legal/privacy/pdfs/apple-privacy-policy-en-ww.pdf" target='_blank' rel="noopener noreferrer">Privacy policies and terms </a></h3>
          </div>
          </div>
          <div className="Footer-Copyright">
            <div className="Footer-Copyright-Social">
              <div className="Footer-Copyright-Social-Imgs">
                <img src={instagram} alt="Instagram" />
                <img src={facebook} alt="Facebook" />
                <img src={youtube} alt="Youtube" />
              </div>
            </div>
            <div className="Footer-Copyright-Copyright">
              <div className="Footer-Copyright-Copyright-title">Powered by</div>
              <div>&nbsp;</div>
              <div className="Footer-Copyright-Copyright-name">Code Academy RADFE-202</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer;