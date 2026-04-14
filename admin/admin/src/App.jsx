import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
const App = () => {
  const[token,setToken] = React.useState(localStorage.getItem('token') || null)
  return (
    <div className='bg-white min-h-screen w-full'>
      {!token ? <Login /> :
      <>
      <Navbar />
      <hr/>
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
      </>
      }
    </div>
  )
}

export default App
