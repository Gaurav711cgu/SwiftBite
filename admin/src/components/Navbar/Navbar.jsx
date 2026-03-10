import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-brand'>
        <span className='brand-swift'>Swift</span><span className='brand-bite'>Bite</span>
        <span className='admin-badge'>Admin</span>
      </div>
      <img className='profile' src={assets.profile_image} alt="admin" />
    </div>
  )
}

export default Navbar
