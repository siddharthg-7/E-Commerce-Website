import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
    try {
        let token = req.headers.token || req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (typeof token === 'string' && token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = decodedToken.id;
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

 export {authUser}