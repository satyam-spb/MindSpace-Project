import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://mind-space-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error!');
});
app.use(express.urlencoded({extended:false}));


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB CONNECTED! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1);
  }
};
connectDB();

app.use('/api', authRoutes);
app.use('/api', quoteRoutes); // Add the quote routes

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

export default app;