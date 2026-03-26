import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';
// import SearchBar from '../components/SearchBar'; // ❌ Removed duplicate

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    let productscopy = [...products];

    if (showsearch && search.trim() !== '') {
      productscopy = productscopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productscopy = productscopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productscopy = productscopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productscopy);
  };

  const sortProducts = (type) => {
    let sorted = [...filteredProducts];

    switch (type) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilters();
        return;
    }

    setFilteredProducts(sorted);
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showsearch, products]);

  useEffect(() => {
    sortProducts(sortType);
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* FILTERS */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 transition-transform ${
              showFilter ? 'rotate-90' : ''
            }`}
          />
        </p>

        {/* CATEGORY */}
        <div
          className={`border pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div
          className={`border pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm">
            {[
              { label: 'Top Wear', value: 'TopWear' },
              { label: 'Bottom Wear', value: 'BottomWear' },
              { label: 'Winter Wear', value: 'WinterWear' },
            ].map((type) => (
              <label key={type.value} className="flex gap-2">
                <input
                  type="checkbox"
                  value={type.value}
                  onChange={toggleSubCategory}
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between mb-4">
          <Tittle text1="ALL" text2="COLLECTIONS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border px-2"
          >
            <option value="relevant">Sort by relevance</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;