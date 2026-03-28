import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
        <Tittle text1='About' text2='Us' />

      </div>
      <div className='my-8 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="About Us"  className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 '>
        <p>Forevor was founded with a simple mission: to provide high-quality products at affordable prices.</p>
        <p>Since then, we have been committed to delivering exceptional value and outstanding customer service.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to make quality products accessible to everyone. We believe that everyone deserves to experience the best, and we strive to achieve this by offering a wide range of products that meet the highest standards of quality and affordability.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Tittle text1='Why' text2='Choose Us' />
      </div>
    </div>
  )
}

export default About