import { createContext, useEffect, useState } from "react";
import {products} from '../assets/assets'
import { toast } from "react-toastify";
const ShopContext = createContext({
    products: [],
    currency: '$',
    delivery_fee: 0,
    search: '',
    setShowSearch: () => {},
    setSearch: () => {},
    showsearch: false,
    cartItems: {},
    addToCart: () => {},
    removeFromCart: () => {},
    getCartItemsCount: () => 0,
});
const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showsearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const addToCart = async (itemId,size) =>
    {
        if(!size) {
            toast.error('Please select size', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId])
        {            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1;
            }
            else            {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            }
            setCartItems(cartData);

    }

    const removeFromCart = (itemId, size, quantityToRemove = 1) => {
        const cartData = structuredClone(cartItems);

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return;
        }

        cartData[itemId][size] -= quantityToRemove;

        if (cartData[itemId][size] <= 0) {
            delete cartData[itemId][size];
        }

        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        setCartItems(cartData);
    };


    const getCartItemsCount = () => {
    let totalcount = 0;

  for (const itemId in cartItems) {
    const productExists = products.some(p => p._id === itemId);

    if (!productExists) continue;

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];

      if (quantity > 0) {
        totalcount += quantity;
      }
    }
  }

  return totalcount;
};
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setShowSearch,
        setSearch,
        showsearch,
        cartItems,
        addToCart,
        removeFromCart,
        getCartItemsCount
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
export { ShopContext };
export default ShopContextProvider;