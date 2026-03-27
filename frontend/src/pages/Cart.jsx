import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Cart = () => {
  const { products, currency, cartItems, removeFromCart } = useContext(ShopContext);

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

  if (cartData.length === 0) {
    return <div className='border-t pt-8 text-gray-600'>Your cart is empty.</div>;
  }

  return (
    <>
      {cartData.map((item, index) => {
        const productData = products.find((product) => product._id === item._id);

        if (!productData) {
          return null;
        }

        return (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] items-center gap-4'
          >
            <div className='flex items-start gap-6'>
              <img
                className='w-16 sm:w-20'
                src={productData.image[0]}
                alt=''
              />
              <div>
                <p className='text-xs sm:text-lg font-medium'>
                  {productData.name}
                </p>

                <div className='flex items-center gap-5 mt-2'>
                  <p>
                    {currency}
                    {productData.price}
                  </p>

                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                    {item.size}
                  </p>
                </div>
              </div>
            </div>
            <input
              className='border w-14 sm:w-20 px-2 py-1 text-center justify-self-center'
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
    </>
  );
};

export default Cart