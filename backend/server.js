import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors()); // ✅ Allow all origins
app.use(express.json()); // Parse JSON

// Routes
app.use('/api/users', userRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
