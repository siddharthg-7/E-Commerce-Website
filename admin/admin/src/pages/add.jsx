import React from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token, setToken }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [cat, setCat] = useState('men')
  const [subCat, setSubCat] = useState('topwear')
  const [size, setSize] = useState([])
  const [stock, setStock] = useState(0)
  const [isBestseller, setIsBestseller] = useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);
      formData.append('name', name);
      formData.append('description', desc);
      formData.append('price', price);
      formData.append('category', cat);
      formData.append('subCategory', subCat);
      formData.append('sizes', JSON.stringify(size));
      formData.append('stock', stock);
      formData.append('bestseller', isBestseller);
      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token: token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDesc('')
        setPrice('')
        setStock(0)
        setSize([])
        setIsBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log("Backend error response:", error.response?.data);
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }

  }
  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex flex-col w-full items-start gap-3'>
        <p className="mb-2">
          Upload image
        </p>
        <div className="flex gap-2">
          <label htmlFor="image1" >
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Icon" className='w-20 ' />
            <input onChange={(e) => setImage1(e.target.files[0])} id="image1" type="file" className='hidden' />
          </label>
          <label htmlFor="image2" >
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Icon" className='w-20 ' />
            <input onChange={(e) => setImage2(e.target.files[0])} id="image2" type="file" className='hidden' />
          </label>
          <label htmlFor="image3" >
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Icon" className='w-20 ' />
            <input onChange={(e) => setImage3(e.target.files[0])} id="image3" type="file" className='hidden' />
          </label>
          <label htmlFor="image4" >
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Icon" className='w-20 ' />
            <input onChange={(e) => setImage4(e.target.files[0])} id="image4" type="file" className='hidden' />
          </label>

        </div>
      </div>
      <div>
        <p className='w-full'>Product Name </p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Type here ' required />

      </div>
      <div>
        <p className='w-full'>Product Description </p>
        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className='w-full max-w-[500px] px-3 py-2' placeholder='Type here ' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCat(e.target.value)} value={cat} className='w-full px-3 py-2' id="">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>SubCategory</p>
          <select onChange={(e) => setSubCat(e.target.value)} value={subCat} className='w-full px-3 py-2' id="">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='Type here' />
        </div>
      </div>

      <div >
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-2'>
          <div onClick={() => setSize(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={` ${size.includes("S") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>S</p>
          </div>
          <div onClick={() => setSize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={` ${size.includes("M") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>M</p>
          </div>
          <div onClick={() => setSize(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={` ${size.includes("L") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>L</p>
          </div>
          <div onClick={() => setSize(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={` ${size.includes("XL") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>XL</p>
          </div>
          <div onClick={() => setSize(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={` ${size.includes("XXL") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>XXL</p>
          </div>
          <div onClick={() => setSize(prev => prev.includes("XXXL") ? prev.filter(item => item !== "XXXL") : [...prev, "XXXL"])}>
            <p className={` ${size.includes("XXXL") ? "bg-pink-100" : "bg-slate-200 "}  px-3 py-1 cursor-pointer `}>XXXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2 '>
        <input onChange={(e) => setIsBestseller(prev => !prev)} checked={isBestseller} type="checkbox" id="bestseller" />
        <label htmlFor="bestseller" className='cursor-pointer'>Add to Bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>Add</button>
    </form>
  )
}

export default Add