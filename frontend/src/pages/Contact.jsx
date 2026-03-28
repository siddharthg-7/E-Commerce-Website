import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-b'>
        <Tittle text1='Contact' text2='Us' />

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 '>
        <img  className="w-full md:max-w-[480px]" src={assets.contact_img} alt="Contact Us" />
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>123 Main Street Karmanghat<br />Hyderabad, Telangana 500036</p>
          <p className='text-gray-500'>Tel : (123) 456-7890 <br /> Email : email@example.com</p>
          <p className='font-semibold text-xl text-gray-600'>Carrers At Forever</p>
          <p className='text-gray-500'>We are always looking for talented individuals to join our team. If you are interested in working with us, please send your resume and cover letter to email@example.com
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact