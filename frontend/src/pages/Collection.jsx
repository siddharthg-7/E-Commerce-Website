import React, { use, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = React.useState(false);
  const[filteredProducts, setFilteredProducts] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState([]);
  const toggleCategory = (e) => {
    const value = e.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item => item !== value));
    }else{
      setCategory(prev => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if(subCategory.includes(value)){
      setSubCategory(subCategory.filter(item => item !== value));
    }else{
      setSubCategory(prev => [...prev, value]);
    }
  };

  const applyFilters = () => {
    let productscopy = products.slice();
    if(category.length > 0){
      productscopy = productscopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productscopy = productscopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilteredProducts(productscopy);
  };


  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [category, subCategory]);
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
            <input  className='w-3 h-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
           </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Your filter content */}
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'TopWear'} onChange={toggleSubCategory}/>Top Wear
           </p>
           <p className='flex-gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'BottomWear'} onChange={toggleSubCategory}/>Bottom Wear
           </p>
           <p className='flex gap-2'>
            <input  className='w-3 h-3' type="checkbox" value={'WinterWear'} onChange={toggleSubCategory}/>Winter Wear
           </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Tittle text1={'ALL'} text2={'COLLECTIONS'} />
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/*Map Products*/ }
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item,index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Collection