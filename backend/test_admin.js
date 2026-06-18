import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const testAdmin = async () => {
    try {
        console.log("Generating token for", process.env.ADMIN_EMAIL);
        const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated token:", token);

        console.log("Making request to /api/order/list...");
        const response = await fetch("http://localhost:4000/api/order/list", {
            headers: { token }
        });

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Response data:", data);
    } catch (error) {
        console.log("Error:", error);
    }
}

testAdmin();
