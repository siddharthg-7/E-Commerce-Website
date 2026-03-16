import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from "react";

const Navbar = () => {

  const [visible, setVisible] = useState(false);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to="/">
        <img src={assets.logo} className="w-16" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to="/" className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-6 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/Collection" className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-6 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/About" className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-6 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/Contact" className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-6 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>

      {/* Icons */}
      <div className='flex items-center gap-5 text-gray-700'>

        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />

        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />

          {/* Dropdown */}
          <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to="/Cart" className='relative'>
          <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>0</p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="Menu"
        />

      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 h-full overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} sm:hidden`}>

        <div className='flex flex-col text-gray-600'>

          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/Collection'>Collection</NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/About'>About</NavLink>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/Contact'>Contact</NavLink>

        </div>

      </div>

    </div>
  )
}

export default Navbar