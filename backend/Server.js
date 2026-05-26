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

// Start the API immediately so auth-only routes keep working even if the DB is down.
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  if (process.env.SKIP_DB === 'true') {
    console.log('MongoDB connection skipped');
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    console.warn(`API is still running on port ${port}, but DB-backed routes will fail until MongoDB is reachable.`);
  }
};

startServer();