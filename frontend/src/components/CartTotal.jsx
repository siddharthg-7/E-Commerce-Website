import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Tittle';

const CartTotal = () => {
  const { currency, delivery_fee, getcartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl font-bold'>
        <Tittle text1='Cart' text2='Totals' />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{getcartAmount().toFixed(2)}</p>
        </div>

        <hr />

        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        <hr />

        <div className='flex justify-between font-medium text-lg'>
          <p>Total</p>
          <p>
            {currency}
            {(getcartAmount() === 0 ? 0 : getcartAmount() + delivery_fee).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;