import react from 'react'
import { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({ token, setToken }) => {
  const [list, setList] = useState([])
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", { headers: { token: token } })
      if (response.data.success) {
        setList(response.data.products || [])
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  }

  const removeproduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token: token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  }


  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-2 font-semibold text-lg text-gray-600'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title*/}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center  py-1 px-2 border bg-gray-100  text-xs md:text-sm   '>
          <b>Image</b>
          <b>Product Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Actions</b>
        </div>
        {/* List Items */}

        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2  py-1 px-2 border text-sm hover:bg-gray-50'>
              <img src={item.image[0]} alt="" className='w-12 h-12 object-contain' />
              <p className='line-clamp-2'>{item.name}</p>
              <p>{item.cat}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>

            </div>
          ))
        }
      </div>
    </>
  )

}

export default List
