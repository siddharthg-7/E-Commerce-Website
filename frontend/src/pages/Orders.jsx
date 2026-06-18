import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle'
import axios from 'axios';

const Orders = () => {
  const { backendURL, tokens, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!tokens) {
        return null;
      }
      const response = await axios.post(backendURL + '/api/order/userorder', {}, { headers: { Authorization: tokens } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentmethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [tokens]);

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
          orderData.map((item, index) => {
            return (
              <div key={index} className='py-4 border-t border-b flex flex-col md:flex-row text-gray-800 md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-600'>
                      <p className='text-lg font-semibold'>{currency}{item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between '>
                  <div className='flex items-center gap-2'>
                    <p className='w-3 h-3 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm md:text-base font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders