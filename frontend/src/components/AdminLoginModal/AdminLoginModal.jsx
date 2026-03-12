import React, { useState } from 'react'
import './AdminLoginModal.css'
import { useAppMode } from '../../Context/AppModeContext'

const AdminLoginModal = ({ onClose }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const { switchToAdmin, adminLoginErr, setAdminLoginErr } = useAppMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate auth delay
    const ok = switchToAdmin(email, password);
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <div className='alm-overlay' onClick={e => { if(e.target.className==='alm-overlay') { setAdminLoginErr(''); onClose(); }}}>
      <div className='alm-box'>
        <div className='alm-header'>
          <div className='alm-icon'>🛡️</div>
          <h2>Admin Access</h2>
          <p>Enter your admin credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className='alm-form'>
          <div className='alm-field'>
            <label>Email</label>
            <input type='email' placeholder='admin@swiftbite.dev' value={email} onChange={e => { setEmail(e.target.value); setAdminLoginErr(''); }} required />
          </div>
          <div className='alm-field'>
            <label>Password</label>
            <input type='password' placeholder='••••••••' value={password} onChange={e => { setPassword(e.target.value); setAdminLoginErr(''); }} required />
          </div>

          {adminLoginErr && <div className='alm-error'>⚠️ {adminLoginErr}</div>}

          <div className='alm-hint'>
            <span>Demo: <b>admin@swiftbite.dev</b> / <b>admin123</b></span>
          </div>

          <button type='submit' className='alm-btn' disabled={loading}>
            {loading ? '⏳ Verifying...' : '🔓 Enter Admin Mode'}
          </button>
        </form>

        <button className='alm-cancel' onClick={() => { setAdminLoginErr(''); onClose(); }}>Cancel</button>
      </div>
    </div>
  )
}

export default AdminLoginModal
