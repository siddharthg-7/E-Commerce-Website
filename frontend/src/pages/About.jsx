import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

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
        <b className='text-gray-600'>Our Mission</b>
        <p>Our mission is to make quality products accessible to everyone. We believe that everyone deserves to experience the best, and we strive to achieve this by offering a wide range of products that meet the highest standards of quality and affordability.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Tittle text1='Why' text2='Choose Us' />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:w-1/2'>
          <h3 className='font-bold text-lg mb-2'>Quality Products</h3>
          <p className=' text-gray-600'>We are committed to providing the highest quality products that meet our rigorous standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:w-1/2'>
          <h3 className='font-bold text-lg mb-2'>Convenient Shopping</h3>
          <p className=' text-gray-600'>We believe that quality should be accessible to everyone, which is why we offer competitive prices.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:w-1/2'>
          <h3 className='font-bold text-lg mb-2'>Exceptional Customer Service:</h3>
          <p className=' text-gray-600'>We are committed to providing the highest quality products that meet our rigorous standards.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About