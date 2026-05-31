import React from 'react'
import './Footer.css'

import instagram from '../Assets/instagram_icon.png'
import pinterest from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
import nexcartify from '../Assets/NexCatify.png'

const Footer = () => {
  return (

    <div className='footer'>

      <div className="footer-logo">
        <img src={nexcartify} alt="" />
       
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">

        <div className="footer-icons-container">
          <img src={instagram} alt="" />
        </div>

        <div className="footer-icons-container">
          <img src={pinterest} alt="" />
        </div>

        <div className="footer-icons-container">
          <img src={whatsapp} alt="" />
        </div>

      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @2026 - All Rights Reserved</p>
      </div>

    </div>

  )
}

export default Footer