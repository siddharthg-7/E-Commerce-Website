import jwt from 'jsonwebtoken';

const adminauth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decode?.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
        }
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(401).json({ success: false, message: error.message });
    }
};
export default adminauth; 