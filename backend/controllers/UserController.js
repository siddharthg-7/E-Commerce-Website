import { json } from "express"
import validator from "validator";
import userModel from "../models/userModel.js";
const loginUser = async (req, res) => {

}

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({  success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({  success: false, message: 'Please enter a valid email' });
        }
        if (password.length < 8) {
            return res.status(400).json({  success: false, message: 'Password must be at least 8 characters long' });
        }
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({  success: false, message: 'Server error' });
    }

}
//route for admin login 
const adminLogin = async (req, res) => {

}
export { loginUser, registerUser, adminLogin }