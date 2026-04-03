import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.get('/', (req, res) => {
  res.send('API is running');
});

// start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
};

startServer();