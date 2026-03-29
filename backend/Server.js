import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 4000;
// middleware

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});     

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
} );