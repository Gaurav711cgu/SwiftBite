import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { useAppMode } from '../../Context/AppModeContext'
import AdminLoginModal from '../AdminLoginModal/AdminLoginModal'

const Navbar = ({ setShowLogin }) => {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [scrolled,     setScrolled]     = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const { getTotalCartAmount, token, setToken, cartItems } = useContext(StoreContext);
  const { isAdmin, mode, logoutAdmin, switchToUser } = useAppMode();
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const logout = () => {
    localStorage.removeItem("token"); setToken(""); navigate('/');
  }

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350); }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleModeToggle = () => {
    if (isAdmin) { switchToUser(); navigate('/'); }
    else setShowAdminLogin(true);
  }

  const cartCount = Object.values(cartItems).filter(v => v > 0).length;

  return (
    <>
      {isAdmin && (
        <div className='admin-top-bar'>
          🛡️ Admin Mode Active &nbsp;—&nbsp;
          <Link to='/admin'>Dashboard</Link> ·
          <Link to='/admin/add'>Add Food</Link> ·
          <Link to='/admin/list'>Menu</Link> ·
          <Link to='/admin/orders'>Orders</Link>
          <button onClick={() => { logoutAdmin(); navigate('/'); }}>Exit Admin</button>
        </div>
      )}

      <div className='navbar-strip'>
        🔥 Free delivery on your first order! Use code <b>&nbsp;SWIFTBITE</b>
      </div>

      <div className={`navbar ${scrolled ? 'scrolled' : ''} ${isAdmin ? 'navbar-admin' : ''}`}>
        <Link to='/' className='navbar-brand'>
          <span className='brand-swift'>Swift</span><span className='brand-bite'>Bite</span>
          {isAdmin && <span className='brand-admin-tag'>ADMIN</span>}
        </Link>

        <div className='navbar-location' onClick={() => scrollTo('footer')}>
          <span>📍</span>
          <div><span className='loc-label'>Deliver to</span><span className='loc-value'>Your City ▾</span></div>
        </div>

        <div className='navbar-search'>
          <span>🔍</span>
          <input
            type='text' placeholder='Search dishes, restaurants...'
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if(e.key==='Enter' && searchQuery.trim()) { if(location.pathname!=='/') navigate('/'); setTimeout(()=>document.getElementById('food-display')?.scrollIntoView({behavior:'smooth'}),300); }}}
          />
        </div>

        <ul className={`navbar-menu ${mobileOpen ? 'mobile-open' : ''}`}>
          {mobileOpen && <div className='mobile-close' onClick={() => setMobileOpen(false)}>✕</div>}
          <li><Link to="/" className={location.pathname==='/'?'active':''}>Home</Link></li>
          <li><a onClick={() => scrollTo('explore-menu')} className='nav-link'>Menu</a></li>
          <li><Link to="/restaurants" className={location.pathname==='/restaurants'?'active':''}>Restaurants</Link></li>
          <li><Link to="/offers" className={location.pathname==='/offers'?'active':''}>Offers 🔥</Link></li>
          {isAdmin && <li><Link to="/admin" className={`admin-nav-link ${location.pathname.startsWith('/admin')?'active':''}`}>⚙️ Admin</Link></li>}
        </ul>

        <div className="navbar-right">
          {/* Mode switcher toggle */}
          <div className={`mode-toggle ${isAdmin ? 'admin-active' : ''}`} onClick={handleModeToggle} title={isAdmin ? 'Switch to User mode' : 'Switch to Admin mode'}>
            <div className='mode-toggle-track'>
              <span className='mode-icon-user'>👤</span>
              <span className='mode-icon-admin'>🛡️</span>
              <div className='mode-toggle-thumb'></div>
            </div>
            <span className='mode-label'>{isAdmin ? 'Admin' : 'User'}</span>
          </div>

          {!isAdmin && (
            <Link to='/cart' className='navbar-cart-btn'>
              <span>🛒</span>
              <span className='cart-label'>Cart</span>
              {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
            </Link>
          )}

          {!token
            ? <button className='signin-btn' onClick={() => setShowLogin(true)}>Sign In</button>
            : <div className='navbar-profile'>
                <div className='profile-avatar'>👤</div>
                <ul className='navbar-profile-dropdown'>
                  <li className='dropdown-header'>MY ACCOUNT</li>
                  <hr />
                  <li onClick={() => navigate('/myorders')}><span>📦</span> My Orders</li>
                  <li onClick={() => navigate('/offers')}><span>🔥</span> Offers</li>
                  {isAdmin && <><hr /><li onClick={() => navigate('/admin')}><span>⚙️</span> Admin Panel</li></>}
                  <hr />
                  <li onClick={logout}><span>🚪</span> Logout</li>
                </ul>
              </div>
          }

          <div className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} />}
    </>
  )
}

export default Navbar
