import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}
const loginUser = async (req, res) => {
    res.status(501).json({ success: false, message: 'Login not implemented yet' });
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


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({  success: false, message: 'Server error' });
    }

}


const adminLogin = async (req, res) => {

}
export { loginUser, registerUser, adminLogin }