import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Este archivo es el "cerebro" que arranca la aplicación.
 * Se encarga de renderizar el componente principal (App.jsx)
 * dentro del elemento con id 'root' definido en tu index.html.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
