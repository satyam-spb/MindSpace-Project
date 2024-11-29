import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import DB_NAME from './constants.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {});
    console.log(`MONGODB CONNECTED! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Errorrrr connecting to the database", error);
    process.exit(1);
  }
};

app.use('/api', authRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
