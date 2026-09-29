import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FavoritosProvider } from './Context/FavoritosContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritosProvider>
      <App />
    </FavoritosProvider>
  </StrictMode>
)
