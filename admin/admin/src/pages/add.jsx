import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import assets from '../assets/assets'

const Add = () => {
  return (
    <form>
      <div className='flex flex-col w-full items-start gap-3'>
        <p className="mb-2">
          Upload image
        </p>
        <div className="flex gap-2">
          <label htmlFor="image1" >
            <img src={assets.upload_area} alt="Upload Icon" className='w-20 ' />
            <input id="image1" type="file" className='hidden' />
          </label>
          <label htmlFor="image2" >
            <img src={assets.upload_area} alt="Upload Icon" className='w-20 ' />
            <input id="image2" type="file" className='hidden' />
          </label>
          <label htmlFor="image3" >
            <img src={assets.upload_area} alt="Upload Icon" className='w-20 ' />
            <input id="image3" type="file" className='hidden' />
          </label>
          <label htmlFor="image4" >
            <img src={assets.upload_area} alt="Upload Icon" className='w-20 ' />
            <input id="image4" type="file" className='hidden' />
          </label>

        </div>
      </div>
      <div>
        <p className='w-full'>Product Name </p>
        <input type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Type here ' required />

      </div>
      <div>
        <p className='w-full'>Product Description </p>
        <textarea className='w-full max-w-[500px] px-3 py-2' placeholder='Type here ' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2' id="">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>SubCategory</p>
          <select className='w-full px-3 py-2' id="">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='Type here' />
        </div>
      </div>

      <div>
        <p>Product Sizes</p>
        <div className='flex gap-2'>
          <div>
            <p>S</p>
            </div>
          <div>
            <p>M</p>
            </div>
          <div>
            <p>L</p>
            </div>
          <div><p>XL</p></div>
          <div><p>XXL</p></div>
          <div><p>XXXL</p></div>
        </div>
      </div>
    </form>
  )
}

export default Add