import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import assets from '../assets/assets'

const add = () => {
  return (
    <form >
      <div>
        <p>
          Upload image 
        </p>
        <div> 
          <label htmlFor="fileInput" className='cursor-pointer bg-gray-200 px-3 py-1 rounded-md text-sm'>
            <img src={assets.upload_area} alt="Upload Icon" className='w-5 h-5 inline-block mr-2' />
            Choose File
            <input id="fileInput" type="file" className='hidden' />

          </label>

        </div>
      </div>
    </form>
  )
}

export default add