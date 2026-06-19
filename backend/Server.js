import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartrouter from './routes/cartRoute.js';
import orderRouter from './routes/orderroute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartrouter)
app.use('/api/order', orderRouter)
app.get('/', (req, res) => {
  res.send('API is running');
});

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

export default app;