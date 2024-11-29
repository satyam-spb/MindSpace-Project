import { Quote } from '../models/quoteModel.js';

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quotes', error: error.message });
  }
};

export const getRandomQuote = async (req, res) => {
  try {
    const quotes = await Quote.find();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(200).json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch a random quote', error: error.message });
  }
};
