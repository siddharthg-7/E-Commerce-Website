import orderModel from "../models/ordermodel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// global stripe instance
let stripe;

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
        const { userId, items, amount, address } = req.body
        const { orgin } = req.headers;
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
            quantity: item.quantity
        });
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity:item.quantity
        })
        if (!stripe) {
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

const placeorderRazorpay = async (req, res) => {

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
        res.json({ success: true, orders });
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
export { placeorder, placeorderStripe, placeorderRazorpay, allorders, usersorder, updateorder }
