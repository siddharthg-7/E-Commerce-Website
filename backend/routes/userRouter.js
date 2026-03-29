import express from 'express';
import cors from 'cors';
import { loginUser,registerUser,adminLogin } from '../controllers/UserController.js';
const userRouter = express.Router();
userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);
userRouter.post('/admin/login',adminLogin);
export default userRouter;