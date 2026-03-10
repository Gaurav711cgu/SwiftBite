import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className='footer-brand'>
            <span className='brand-swift'>Swift</span><span className='brand-bite'>Bite</span>
          </div>
          <p>SwiftBite delivers your favourite meals fast, fresh, and with a premium experience. Developed with passion by Gaurav Kumar Nayak.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-98765-43210</li>
            <li>gaurav@swiftbite.dev</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © SwiftBite — Built by <span>Gaurav Kumar Nayak</span>. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
