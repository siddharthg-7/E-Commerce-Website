import React, { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState('');
  const[size, setSize] = useState('');

  const productData = useMemo(
    () => products.find((item) => item._id === productId) || null,
    [products, productId]
  );

  const image = useMemo(() => {
    if (!productData) {
      return '';
    }

    if (selectedImage && productData.image.includes(selectedImage)) {
      return selectedImage;
    }

    return productData.image[0];
  }, [productData, selectedImage]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img
                  onClick={() => setSelectedImage(item)}
                  key={index}
                  src={item}
                  alt={productData.name}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover border-2 border-gray-300 rounded-md'
              />
              ))}
          </div>
          <div className='w-full sm:w-[80%] '>
            <img src={image} alt={productData.name} className='w-full h-auto object-cover border-2 border-gray-300 rounded-md' />
          </div>
        </div>
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Star" className="w-3 5" />
            <img src={assets.star_icon} alt="Star" className="w-3 5" />
            <img src={assets.star_icon} alt="Star" className="w-3 5" />
            <img src={assets.star_icon} alt="Star" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="Star" className="w-3 5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price.toFixed(2)}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                 <button
                 onClick={() => setSize(item)} key={index} className={`border-2 rounded-md w-10 h-10 flex items-center justify-center cursor-pointer ${item === size ? 'border-orange-500' : 'border-gray-300' }`}> 
                 {item}
                 </button>
                ))}
            
            </div>
          </div>
          <button 
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery available on this product</p>
            <p>Easy Return and Exchange Policy within 7 days</p>
          </div>
        </div>



      </div>
      <div className='mt-20 '>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima culpa, eum voluptate voluptates debitis? Molestiae officiis id ullam consequuntur perferendis qui eligendi perspiciatis pariatur itaque asperiores, adipisci voluptatem dignissimos.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0' />;
};

export default Product