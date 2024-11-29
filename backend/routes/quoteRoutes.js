// routes/quoteRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Quote from "../models/quoteModel.js";

const router = express.Router();

// Get Unique Quote
router.get("/quote", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(decoded.id);
    const seenQuoteIds = user.viewedQuotes;

    // Fetch a random quote that hasn't been seen
    const quote = await Quote.findOne({ _id: { $nin: seenQuoteIds } });
    if (!quote) return res.status(404).json({ error: "No new quotes available" });

    // Update user's viewed quotes
    user.viewedQuotes.push(quote._id);
    await user.save();

    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

export default router;
