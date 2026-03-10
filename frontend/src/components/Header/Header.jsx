import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-overlay'></div>
      <div className='header-contents'>
        <div className='header-badge'>🔥 Fast Delivery · Premium Quality</div>
        <h1>Cravings Delivered<br /><span>In Minutes.</span></h1>
        <p>Discover handpicked dishes from the finest restaurants near you. Fresh, fast, and made to perfection — every single time.</p>
        <div className='header-buttons'>
          <a href='#explore-menu'><button className='btn-primary'>Explore Menu</button></a>
          <a href='#app-download'><button className='btn-secondary'>Get the App</button></a>
        </div>
      </div>
    </div>
  )
}

export default Header
