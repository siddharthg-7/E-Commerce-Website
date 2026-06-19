import express from 'express'
import {addTocart,updateCart,getusercart} from '../controllers/CartController.js'
import {authUser} from '../middleware/auth.js'

const cartrouter = express.Router();

cartrouter.post("/add",authUser,addTocart);
cartrouter.post("/update",authUser, updateCart);
cartrouter.post("/get",authUser, getusercart);

export default cartrouter