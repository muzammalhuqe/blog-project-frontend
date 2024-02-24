import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/Auth-Context.jsx'

import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/arya-purple/theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)
