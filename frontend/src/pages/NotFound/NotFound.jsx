import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='not-found'>
      <h1>4<span>0</span>4</h1>
      <h2>Page Not Found</h2>
      <p>Looks like this page got delivered to the wrong address!</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}

export default NotFound
