    import React, { use, useContext } from 'react'
    import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
    const SearchBar = () => {

        const {search,setSearch,showsearch,setShowSearch} = useContext(ShopContext);
        const location = useLocation();
        

      return showsearch ? (
        <div className='border-t border-b bg-gray-50 text-center p-4'>
          <div className='inline-flex items-center justify-center  border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4'>
          <input 
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flx-1 outline-none bg-inherit text-sm  w-full"
          />
          <img  className="w-4 h-4" src ={assets.search_icon} alt="Search" />
          </div>
          <img className="inline w-3 cursor-pointer" src ={assets.cross_icon} alt="Close" onClick={() => setShowSearch(false)} />
        </div>
      ) : null;
    }
    
    export default SearchBar