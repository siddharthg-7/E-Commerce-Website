import jwt from 'jsonwebtoken';

const adminauth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization') || '';
        const token = authHeader.replace('Bearer ', '');
        if(!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decode?.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    }     catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};
export default adminauth; 