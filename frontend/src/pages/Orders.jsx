import React from 'react'
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle'

const Orders = () => {
  const {products,currency} = React.useContext(ShopContext);


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Tittle text1='My' text2='Orders' />
      </div>
      <div>
        {
          products.slice(1,4).map((items,index) => (
            <div key={index} className='py-4 border-t border-b flex flex-col md:flex-row text-gray-800 md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={items.image[0]} alt={items.name} />
                <div>
                  <p className='sm:text-base font-medium'>{items.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-600'>
                    <p className='text-lg font-semibold'>{currency}{items.price.toFixed(2)}</p>
                    <p>Quantity:1</p>
                    <p>Size:m</p>                  
                  </div>
                  <p>Date :mt-2 <span className='text-gray-400'>28 March 2026</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between '>
              <div className='flex item-center gap-2'>
                <p className='min-w h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready To Ship</p>
                </div>
                <button className='border px-4 py-2 text-sm md:text-base font-medium rounded-sm '>Track Order</button>
              </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default Orders