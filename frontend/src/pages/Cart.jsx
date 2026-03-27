import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    currency,
    cartItems,
    delivery_fee,
    removeFromCart,
    getcartAmount,
  } = useContext(ShopContext);

  const cartData = useMemo(() => {
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

  const subTotal = getcartAmount();
  const total = subTotal === 0 ? 0 : subTotal + delivery_fee;

  if (cartData.length === 0) {
    return <div className='border-t pt-8 text-gray-600'>Your cart is empty.</div>;
  }

  return (
    <>
      <div className='text-2xl mb-4 border-t pt-8'>
        <Tittle text1='YOUR' text2='CART' />
      </div>

      {cartData.map((item) => {
        const productData = products.find((product) => product._id === item._id);

        if (!productData) {
          return null;
        }

        return (
          <div
            key={item._id + item.size}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] items-center gap-4'
          >
            <div className='flex items-start gap-6'>
              <img
                className='w-16 sm:w-20'
                src={productData.image[0]}
                alt=''
              />
              <div>
                <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>

                <div className='flex items-center gap-5 mt-2'>
                  <p>
                    {currency}
                    {productData.price}
                  </p>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                </div>
              </div>
            </div>

            <input
              className='no-spinner border w-14 sm:w-20 px-2 py-1 text-center justify-self-center'
              type='number'
              min={1}
              defaultValue={item.quantity}
            />

            <img
              src={assets.bin_icon}
              alt='Remove'
              className='w-4 mr-4 sm:w-5 cursor-pointer justify-self-end'
              onClick={() => removeFromCart(item._id, item.size, item.quantity)}
            />
          </div>
        );
      })}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <div className='text-2xl mb-4'>
            <Tittle text1='CART' text2='TOTALS' />
          </div>

          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex justify-between border-b pb-2'>
              <p>Subtotal</p>
              <p>{currency}{subTotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between border-b pb-2'>
              <p>Shipping Fee</p>
              <p>{currency}{delivery_fee.toFixed(2)}</p>
            </div>
            <div className='flex justify-between font-semibold'>
              <p>Total</p>
              <p>{currency}{total.toFixed(2)}</p>
            </div>
          </div>

          <div className='w-full text-end mt-6'>
            <button
              type='button'
              onClick={() => navigate('/PlaceOrder')}
              className='bg-black text-white text-sm px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;