import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    default: null 
  },
  category: {
    type: String,
    required: true,
    enum: ['motivational', 'mindfulness', 'success', 'happiness']
  }
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;