import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify/Verify'
import NotFound from './pages/NotFound/NotFound'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Restaurants from './pages/Restaurants/Restaurants'
import Offers from './pages/Offers/Offers'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminAddFood from './pages/Admin/AdminAddFood'
import AdminFoodList from './pages/Admin/AdminFoodList'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminGuard from './components/AdminGuard/AdminGuard'
import './App.css'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer theme="dark" position="top-right" />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />

      <div className='app'>
        <Routes>
          {/* ── User Routes ── */}
          <Route path='/'              element={<Home />} />
          <Route path='/cart'          element={<Cart />} />
          <Route path='/order'         element={<PlaceOrder />} />
          <Route path='/myorders'      element={<MyOrders />} />
          <Route path='/verify'        element={<Verify />} />
          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/restaurants'   element={<Restaurants />} />
          <Route path='/offers'        element={<Offers />} />

          {/* ── Admin Routes (protected) ── */}
          <Route path='/admin' element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path='/admin/add' element={<AdminGuard><AdminAddFood /></AdminGuard>} />
          <Route path='/admin/list' element={<AdminGuard><AdminFoodList /></AdminGuard>} />
          <Route path='/admin/orders' element={<AdminGuard><AdminOrders /></AdminGuard>} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
