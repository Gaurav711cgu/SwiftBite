import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  const scrollTo = (id, menuName) => {
    setMenu(menuName);
    setMobileOpen(false);
    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-brand'>
        <span className='brand-swift'>Swift</span><span className='brand-bite'>Bite</span>
      </Link>

      <ul className={`navbar-menu ${mobileOpen ? 'mobile-open' : ''}`}>
        <Link to="/" onClick={() => { setMenu("home"); setMobileOpen(false); }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a onClick={() => scrollTo('explore-menu', 'menu')} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a onClick={() => scrollTo('app-download', 'mob-app')} className={menu === "mob-app" ? "active" : ""}>Mobile App</a>
        <a onClick={() => scrollTo('footer', 'contact')} className={menu === "contact" ? "active" : ""}>Contact</a>
      </ul>

      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token
          ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="profile" />
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
        }
        <div className='hamburger' onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
