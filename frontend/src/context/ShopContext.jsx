import { createContext } from "react";
import {products} from '../assets/assets'
const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = React.useState('');
    const [showsearch,setShowSearch] = React.useState(true);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setShowSearch,
        setSearch,
        showsearch,

    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
export { ShopContext };
export default ShopContextProvider;