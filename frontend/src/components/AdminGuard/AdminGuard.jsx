import React from 'react'
import { useAppMode } from '../../Context/AppModeContext'
import { useNavigate } from 'react-router-dom'
import './AdminGuard.css'

const AdminGuard = ({ children }) => {
  const { isAdmin } = useAppMode();
  const navigate    = useNavigate();

  if (!isAdmin) {
    return (
      <div className='guard-block'>
        <div className='guard-icon'>🔒</div>
        <h2>Admin Access Required</h2>
        <p>This page is only accessible in Admin Mode. Switch modes using the toggle in the navbar.</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    )
  }

  return children;
}

export default AdminGuard
