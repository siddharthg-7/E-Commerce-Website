import express from 'express'
import { verifyrazorpay, verifystripe, placeorder, placeorderStripe, placeorderRazorpay, allorders, usersorder, updateorder } from '../controllers/orderconttoller.js'
import adminauth from '../middleware/adminauth.js'
import { authUser } from '../middleware/Auth.js'

const orderRouter = express.Router()


orderRouter.get("/list", adminauth, allorders)
orderRouter.put("/updateorder", adminauth, updateorder)


orderRouter.post("/place", authUser, placeorder)
orderRouter.post("/Stripe", authUser, placeorderStripe)
orderRouter.post("/Razorpay", authUser, placeorderRazorpay)
orderRouter.post("/verifystripe", authUser, verifystripe)
orderRouter.post("/verifyrazorpay", authUser, verifyrazorpay)

orderRouter.post('/userorder', authUser, usersorder)


export default orderRouter