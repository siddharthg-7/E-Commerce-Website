import React, { useMemo } from 'react'
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle'

const Orders = () => {
  const { products, currency, cartItems } = React.useContext(ShopContext);

  const orderData = useMemo(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];

        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity,
          });
        }
      }
    }

    return tempData;
  }, [cartItems]);

  const orderDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Tittle text1='My' text2='Orders' />
      </div>

      {orderData.length === 0 && (
        <p className='mt-6 text-gray-600'>No orders yet. Add products to cart and place an order.</p>
      )}

      <div>
        {
          orderData.map((orderItem) => {
            const productData = products.find((product) => product._id === orderItem._id);

            if (!productData) {
              return null;
            }

            return (
            <div key={orderItem._id + orderItem.size} className='py-4 border-t border-b flex flex-col md:flex-row text-gray-800 md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='sm:text-base font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-600'>
                    <p className='text-lg font-semibold'>{currency}{productData.price.toFixed(2)}</p>
                    <p>Quantity:{orderItem.quantity}</p>
                    <p>Size:{orderItem.size}</p>
                  </div>
                  <p>Date : <span className='text-gray-400'>{orderDate}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between '>
              <div className='flex items-center gap-2'>
                <p className='w-3 h-3 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready To Ship</p>
                </div>
                <button className='border px-4 py-2 text-sm md:text-base font-medium rounded-sm '>Track Order</button>
              </div>
            </div>
          )})

        }
      </div>
    </div>
  )
}

export default Orders