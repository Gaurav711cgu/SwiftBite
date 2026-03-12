import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import AppModeContextProvider from './Context/AppModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppModeContextProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AppModeContextProvider>
  </BrowserRouter>
)
