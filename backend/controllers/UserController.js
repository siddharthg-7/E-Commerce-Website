import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        }); 
    }catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
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
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({  success: false, message: 'Server error' });
    }

}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ success: true, message: 'Admin login successful', token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error('Error logging in admin:', error);
        return res.status(500).json({ success: false, message: 'Server error' });

    }
}
export { loginUser, registerUser, adminLogin }