import React from 'react'
import './OrderSuccess.css'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className='order-success'>
      <div className='order-success-icon'>🎉</div>
      <h2>Order Placed Successfully!</h2>
      <p>Your food is being prepared and will be delivered shortly. Sit back and relax!</p>
      <div className='order-success-buttons'>
        <button className='btn-primary' onClick={() => navigate('/myorders')}>Track Order</button>
        <button className='btn-secondary' onClick={() => navigate('/')}>Order More</button>
      </div>
    </div>
  )
}

export default OrderSuccess
