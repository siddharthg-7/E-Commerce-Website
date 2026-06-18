import React, { useState } from 'react'
import Tittle from '../components/Tittle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = React.useState('cod');
  const { navigate, backendURL, tokens, cartItems, setCartItems, getCartItemsCount, getcartAmount, delivery_fee, products } = React.useContext(ShopContext);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    street: '',
    email: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })  

  const onchangehandler = React.useCallback((e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }, [formdata]);

  const onsubmithandler = async (event) => {
    event.preventDefault();
    try {
      let orderitems = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[items][size];
              orderitems.push(itemInfo);
            }
          }
        }
      }
      
    let orderData = {
      userId : tokens,
      items: orderitems,
      amount: getcartAmount() + delivery_fee,
      address: formdata
    }
    switch (method) {
      // API calls for cash on delivery order
      case 'cod':
        const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { Authorization: tokens } });
        if (response.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
        break;
      default:
        break;
    }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Please log in to place an order");
        // Clear invalid token if there is one
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };
  

  React.useEffect(() => {
    navigate('/placeorder');
  }, [navigate]);

  return (
    <div className='border-t pt-10 min-h-[80vh]'>
      <form onSubmit={onsubmithandler} className='flex flex-col lg:flex-row items-start gap-10 lg:gap-16'>
        <div className='w-full lg:max-w-[540px]'>
          <div className='text-xl sm:text-2xl mb-5'>
            <Tittle text1='Delivery' text2='Information' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <input required onChange={onchangehandler} name='firstname' value={formdata.firstname} type='text' placeholder='First Name' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input required onChange={onchangehandler} name='lastname' value={formdata.lastname} type='text' placeholder='Last Name' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input required onChange={onchangehandler} name='email' value={formdata.email} type='email' placeholder='Email Address' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input required onChange={onchangehandler} name='street' value={formdata.street} type='text' placeholder='Street Address' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
            <input required onChange={onchangehandler} name='city' value={formdata.city} type='text' placeholder='City' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input required onChange={onchangehandler} name='state' value={formdata.state} type='text' placeholder='State' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
            <input required onChange={onchangehandler} name='zipcode' value={formdata.zipcode} type='number' placeholder='Zip Code' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input required onChange={onchangehandler} name='country' value={formdata.country} type='text' placeholder='Country' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input required onChange={onchangehandler} name='phone' value={formdata.phone} type='number' placeholder='Phone Number' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>
        </div>

        <div className='w-full lg:max-w-[420px] lg:ml-auto'>
          <CartTotal />

          <div className='mt-10'>
            <Tittle text1='Payment' text2='Method' />
            <div className='flex flex-row flex-wrap gap-3 mt-2'>
              <div
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 border p-2 cursor-pointer rounded ${method === 'stripe' ? 'bg-green-400 border-green-500' : 'border-gray-300'}`}
                onClick={() => setMethod('stripe')}
              >
                <img className='h-4 object-contain' src={assets.stripe_logo} alt='Stripe' />
                <p className='text-xs text-gray-600 font-medium'>Stripe</p>
              </div>

              <div
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 border p-2 cursor-pointer rounded ${method === 'razorpay' ? 'bg-green-400 border-green-500' : 'border-gray-300'}`}
                onClick={() => setMethod('razorpay')}
              >
                <img className='h-4 object-contain' src={assets.razorpay_logo} alt='Razorpay' />
                <p className='text-xs text-gray-600 font-medium'>Razorpay</p>
              </div>

              <div
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 border p-2 cursor-pointer rounded ${method === 'cod' ? 'bg-green-400 border-green-500' : 'border-gray-300'}`}
                onClick={() => setMethod('cod')}
              >
                <p className='w-3.5 h-3.5 border border-gray-300 rounded-full'></p>
                <p className='text-xs text-gray-600 font-medium'>Cash on Delivery</p>
              </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700'>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder