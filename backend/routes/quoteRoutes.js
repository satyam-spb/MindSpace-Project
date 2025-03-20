import express from "express";
import jwt from "jsonwebtoken";
import Quote from "../models/quoteModel.js";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/quote", verifyToken, async (req, res) => {
  const { category = 'motivational' } = req.query;
  // console.log('Requested category:', category); // Debug log
  
  try {
    const quotes = await Quote.find({ category });
    // console.log(`quotes : ${quotes}`);
    
    
    if (!quotes.length) {
      return res.status(404).json({ error: "No quotes found for this category" });
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // console.log(`single quote : ${quote}`);
    
    
    res.json(quote);
  } catch (error) {
    console.error('Quote fetch error:', error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

export default router;