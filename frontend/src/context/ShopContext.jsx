import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ShopContext = createContext({
    products: [],
    currency: '$',
    delivery_fee: 0,
    search: '',
    setShowSearch: () => { },
    setSearch: () => { },
    showsearch: false,
    cartItems: {},
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: async () => { },
    getCartItemsCount: () => 0,
});
const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [products, setproducts] = useState([]);
    const [tokens, settokens] = useState(localStorage.getItem('token'));
    const [search, setSearch] = useState('');
    const [showsearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select size', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if (tokens) {
            try {
                const response = await axios.post(backendURL + "/api/cart/add", { itemid: itemId, size: size }, {
                    headers: {
                        Authorization: tokens
                    }
                })
                if (response.data.success) {
                    toast.success(response.data.message, { position: "top-right", autoClose: 3000 })
                }
            }
            catch (error) {
                toast.error(error.response?.data?.message || error.message, { position: "top-right", autoClose: 3000 })
                if (error.response && error.response.status === 401) {
                    settokens('');
                    localStorage.removeItem('token');
                }
            }
        }

    }
    const updateQuantity = async (itemId, size, quantity) => {
        let cartdata = structuredClone(cartItems)
        cartdata[itemId][size] = quantity
        setCartItems(cartdata)
        if (tokens) {
            try {
                const response = await axios.post(backendURL + "/api/cart/update", { itemid: itemId, size: size, quantity: quantity }, {
                    headers: {
                        Authorization: tokens
                    }
                })
                if (response.data.success) {
                    toast.success(response.data.message, { position: "top-right", autoClose: 3000 })
                }
            }
            catch (error) {
                toast.error(error.response?.data?.message || error.message, { position: "top-right", autoClose: 3000 })
                if (error.response && error.response.status === 401) {
                    settokens('');
                    localStorage.removeItem('token');
                }
            }
        }

    }

    const removeFromCart = async (itemId, size, quantityToRemove = 1) => {
        const cartData = structuredClone(cartItems);

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return;
        }

        cartData[itemId][size] -= quantityToRemove;

        const newQuantity = cartData[itemId][size];

        if (cartData[itemId][size] <= 0) {
            delete cartData[itemId][size];
        }

        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        setCartItems(cartData);
        
        if (tokens) {
            try {
                const response = await axios.post(backendURL + "/api/cart/update", { itemid: itemId, size: size, quantity: Math.max(0, newQuantity) }, {
                    headers: {
                        Authorization: tokens
                    }
                })
                if (response.data.success) {
                    toast.success("Item removed", { position: "top-right", autoClose: 3000 })
                }
            }
            catch (error) {
                toast.error(error.response?.data?.message || error.message, { position: "top-right", autoClose: 3000 })
            }
        }
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

    const getcartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const productExists = products.some(p => p._id === itemId);

            if (!productExists) continue;

            const productData = products.find(p => p._id === itemId);

            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];

                if (quantity > 0) {
                    totalAmount += productData.price * quantity;
                }
            }
        }

        return totalAmount;
    };
    const getproductsdata = async () => {
        try {
            const response = await axios.get(backendURL + '/api/product/list');
            if (response.data.success) {
                setproducts(response.data.products);
            }
            else {
                toast.error(response.data.message, { position: "top-right", autoClose: 3000 });
            }
        }
        catch (error) {
            toast.error(error.message, { position: "top-right", autoClose: 3000 });
        }
    }
    const getusercart = async (token) => {
        try {
            const response = await axios.post(backendURL + "/api/cart/get", {}, {
                headers: {
                    Authorization: token
                }
            })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || error.message, { position: "top-right", autoClose: 3000 });
            if (error.response && error.response.status === 401) {
                settokens('');
                localStorage.removeItem('token');
            }
        }
    }
    useEffect(() => {
        getproductsdata()
        if (tokens) {
            getusercart(tokens)
        }
    }, [tokens])
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
        getCartItemsCount,
        getcartAmount,
        navigate,
        backendURL, settokens, tokens,
        setCartItems

    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
export { ShopContext };
export default ShopContextProvider;