import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { useEffect } from 'react'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const[token,setToken] = React.useState(localStorage.getItem('token') || null)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div className='bg-white min-h-screen w-full'>
      {!token ? <Login setToken={setToken}/> :
      <>
      <Navbar setToken={setToken} />
      <hr/>
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/add" element={<Add token={token} setToken={setToken} />} />
            <Route path="/list" element={<List token={token} setToken={setToken} />} />
            <Route path="/orders" element={<Orders token={token} setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/add" replace />} />
          </Routes>
        </div>
      </div>
      </>
      }
    </div>
  )
}

export default App
