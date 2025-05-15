import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path'

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js'

dotenv.config()

const port = process.env.Port || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);



if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')))
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => res.send('Server is ready'))
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log((`Server starter on port: ${port}`)))