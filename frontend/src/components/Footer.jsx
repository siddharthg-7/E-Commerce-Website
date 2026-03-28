import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
            <div>
                <img src={assets.logo} className='w-32 mb-5' alt=''/>
                <p>Best Among All the Online Fashion Retailers</p>
            </div>
          <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
               <li>+91 1234567890</li>
              <li>123 Main Street Karmanghat, Hyderabad, Telangana 500036</li>
              <li>email@example.com</li> 
            </ul>
          </div>

        </div>
        <div>
            <hr/>
            <p className='text-center text-sm py-5'>© 2026 Forever. All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer 