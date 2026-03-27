import React from 'react'
import Tittle from '../components/Tittle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
const PlaceOrder = () => {
  const [method, setMethod] = React.useState('cod');
  const {navigate} = React.useContext(ShopContext);

  React.useEffect(() => {
    navigate('/placeorder');
  }, [navigate]);

  return (
    <div className='border-t pt-10 min-h-[80vh]'>
      <div className='flex flex-col lg:flex-row items-start gap-10 lg:gap-16'>
        <div className='w-full lg:max-w-[540px]'>
          <div className='text-xl sm:text-2xl mb-5'>
            <Tittle text1='Delivery' text2='Information' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <input type='text' placeholder='First Name' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input type='text' placeholder='Last Name' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input type='email' placeholder='Email Address' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input type='text' placeholder='Street Address' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
            <input type='text' placeholder='City' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input type='text' placeholder='State' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
            <input type='number' placeholder='Zip Code' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
            <input type='text' placeholder='Country' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
          </div>

          <div className='mt-3'>
            <input type='number' placeholder='Phone Number' className='border border-gray-300 rounded py-2 px-3.5 w-full' />
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
              <button  onClick={() => navigate('/orders')} className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700'>
                PLACE ORDER
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder