import mongoose from "mongoose";
const orderschema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: "Order Placed" },
    paymentmethod: { type: String, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
})
const orderModel = mongoose.model("orderModel", orderschema)
export default orderModel
