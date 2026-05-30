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
          <label htmlFor="image1" >
            <img src={assets.upload_area} alt="Upload Icon"  />
            Choose File
            <input id="image1" type="file" className='hidden' />
          </label>
          <label htmlFor="image2" >
            <img src={assets.upload_area} alt="Upload Icon"  />
            Choose File
            <input id="image2" type="file" className='hidden' />
          </label>
          <label htmlFor="image3" >
            <img src={assets.upload_area} alt="Upload Icon"  />
            Choose File
            <input id="image3" type="file" className='hidden' />
          </label>
          <label htmlFor="image4" >
            <img src={assets.upload_area} alt="Upload Icon"  />
            Choose File
            <input id="image4" type="file" className='hidden' />
          </label>

        </div>
      </div>
    </form>
  )
}

export default add