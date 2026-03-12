import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-col footer-brand-col'>
          <div className='footer-logo'>
            <span className='brand-swift'>Swift</span><span className='brand-bite'>Bite</span>
          </div>
          <p>Delivering happiness to your door. Fast, fresh, and delicious food from the best restaurants near you.</p>
          <div className='footer-socials'>
            <a href='#' className='social-btn'>📘</a>
            <a href='#' className='social-btn'>🐦</a>
            <a href='#' className='social-btn'>📸</a>
            <a href='#' className='social-btn'>▶️</a>
          </div>
          <div className='footer-app-btns'>
            <div className='app-btn'><span>▶</span><div><small>Get it on</small><b>Google Play</b></div></div>
            <div className='app-btn'><span>🍎</span><div><small>Download on</small><b>App Store</b></div></div>
          </div>
        </div>

        <div className='footer-col'>
          <h3>Company</h3>
          <ul>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>Careers</a></li>
            <li><a href='#'>Team</a></li>
            <li><a href='#'>Blog</a></li>
            <li><a href='#'>Press</a></li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3>Contact</h3>
          <ul>
            <li><a href='#'>Help & Support</a></li>
            <li><a href='#'>Partner with Us</a></li>
            <li><a href='#'>Ride with Us</a></li>
            <li>📞 1800-123-4567</li>
            <li>✉️ support@swiftbite.dev</li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3>Legal</h3>
          <ul>
            <li><a href='#'>Terms & Conditions</a></li>
            <li><a href='#'>Privacy Policy</a></li>
            <li><a href='#'>Cookie Policy</a></li>
            <li><a href='#'>Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2025 SwiftBite Technologies Pvt. Ltd. All rights reserved.</p>
        <p>Built by <b>Gaurav Kumar Nayak</b></p>
      </div>
    </footer>
  )
}

export default Footer
