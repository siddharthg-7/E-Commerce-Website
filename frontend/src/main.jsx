import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
    })
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
    
    </BrowserRouter>,   
)
