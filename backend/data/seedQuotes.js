import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Quote } from '../models/quoteModel.js';

dotenv.config();

const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Push yourself, because no one else is going to do it for you." },
  { text: "Dream it. Wish it. Do it." },
  { text: "The harder you work, the greater you’ll feel when you achieve it." }
];

const seedQuotes = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {});
    console.log(`MONGODB CONNECTED! DB HOST: ${connectionInstance.connection.host}`);
    await Quote.deleteMany();
    await Quote.insertMany(quotes);
    console.log('Quotes seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedQuotes();
