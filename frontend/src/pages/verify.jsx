import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const { navigate, tokens, setCartItems, backendURL } = useContext(ShopContext);
    const [searchparams] = useSearchParams();
    const success = searchparams.get('success');
    const orderId = searchparams.get('orderId');

    const verifypayment = async () => {
        try {
            if (!tokens) return;
            
            const response = await axios.post(backendURL + "/api/order/verifystripe", 
                { orderId, success },
                { headers: { token: tokens } }
            );

            if (response.data.success) {
                setCartItems({});
                navigate("/Orders");
            } else {
                navigate("/Cart");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (tokens) {
            verifypayment();
        }
    }, [tokens]);

    return (
        <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl font-medium">Verifying payment...</p>
        </div>
    );
}

export default Verify;
