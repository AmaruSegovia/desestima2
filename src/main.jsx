// TIENES QUE AGREGAR ESTA LÍNEA 👇
import { BrowserRouter } from 'react-router-dom' 

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/desestima2">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)