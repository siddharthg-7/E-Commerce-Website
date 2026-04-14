import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
const App = () => {
  return (
    <div className='bg-white min-h-screen w-full'>
      <>
      <Navbar />
      <hr/>
      <div className='flex w-full'>
        <Sidebar />
      </div>
      </>
    </div>
  )
}

export default App
