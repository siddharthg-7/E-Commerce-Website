import jwt from 'jsonwebtoken'
 const authUser = async(req,res,next)=>{
    try {
        console.log("Headers:", req.headers);
        const token = req.headers.token || req.headers.authorization;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = decodedToken.id
        next()
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        return res.status(401).json({message:"Unauthorized"})
    }
 }

 export {authUser}