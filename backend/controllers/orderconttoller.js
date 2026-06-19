import orderModel from "../models/ordermodel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import razorpay from "razorpay"

//global variables 
const currency = 'inr'
const deliveryCharge = 10

// global stripe instance
let stripe;

// global razorpay instance
let razorpayInstance;

const placeorder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentmethod: "Cash On Delivery",
            payment: false,
            date: Date.now()
        }
        const neworder = new orderModel(orderdata)
        await neworder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

const placeorderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentmethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const neworder = new orderModel(orderdata)
        await neworder.save()
        
        const currency = "inr";
        const deliveryCharge = 10;

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });
        
        if (!stripe) {
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        }
        
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
            line_items: line_items,
            mode: 'payment',
        })
        
        res.json({ success: true, session_url: session.url })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

const verifystripe  = async(req,res) =>
{
    const{orderId,success,userId} = req.body;
    try{
        if(success === "true")
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

const placeorderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentmethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const neworder = new orderModel(orderdata);
        await neworder.save();

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: currency.toUpperCase(),
            receipt: neworder._id.toString()
        };

        if (!razorpayInstance) {
            razorpayInstance = new razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET_KEY,
            });
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const verifyrazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        if (!razorpayInstance) {
            razorpayInstance = new razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET_KEY,
            });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const allorders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const usersorder = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        
        // Filter out abandoned Stripe orders
        const validOrders = orders.filter((order) => {
            if (order.paymentmethod === "Stripe" && !order.payment) {
                return false;
            }
            return true;
        });

        res.json({ success: true, orders: validOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const updateorder = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Order Updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error In Server Side" })
    }
}

export { verifystripe, verifyrazorpay, placeorder, placeorderStripe, placeorderRazorpay, allorders, usersorder, updateorder }
