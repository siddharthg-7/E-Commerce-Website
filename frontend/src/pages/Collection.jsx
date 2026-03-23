import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = React.useState(true);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        
        <p 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img src={assets.dropdown_icon} alt="dropdown" className={`h-3 transition-transform ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Your filter content */}
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'Men'}/>Men
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'Women'}/>Women
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'Kids'}/>Kids
           </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Your filter content */}
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'TopWear'}/>Top Wear
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'BottomWear'}/>Bottom Wear
           </p>
           <p className='flex gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'WinterWear'}/>Winter Wear
           </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Tittle text1={'ALL'} text2={'COLLECTIONS'} />
        </div>
      </div>
    </div>
  )
}

export default Collection