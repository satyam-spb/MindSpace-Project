import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const router = express.Router();

const generateUniqueId = () => mongoose.Types.ObjectId();

// User Registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const newUser = new User({ username, email, password });

    await newUser.save();
    newUser.password = undefined; // Remove password before sending user data
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Get User Profile
router.get("/profile", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
 }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Add Habit
router.post("/profile/add-habit", async (req, res) => {
  const { newHabit } = req.body;
  // console.log("habit",newHabit);
  

  const token = req.headers.authorization.split(" ")[1];
  // console.log("token present");
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
 }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decoded");
  

  try {
    const user = await User.findById(decoded.id);
    // console.log("user found");
    
    const habitExists = user.habits.some(h => h.name === newHabit);
    // console.log("habit exists? ",habitExists);
    
    if (habitExists) {
      return res.status(400).json({ error: "Habit already exists" });
    }
    // console.log("habit doesn't exist");
    // console.log("user : ",user);
    
    user.habits.push({
      name: newHabit,
      streak: 0,  // Add streak with the default value
      lastStreakDate: Date.now()  // Add the current date as the default value
      // id: generateUniqueId()  // If you want to keep the custom ID
    });
    
    // console.log("pushed to memory ");
    // console.log("user : ",user);
    
    await user.save();
    // console.log("saved");
    
    res.status(201).json({ message: "Habit added successfully", habits: user.habits });
  } catch (error) {
    console.log("Encountered Error");
    
    res.status(500).json({ error: "Failed to add habit" });
  }
});

// Add Streak
router.post("/profile/add-streak", async (req, res) => {
  const { habitName } = req.body; // Habit name from the frontend
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
 }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(decoded.id); // Find the user in the DB
    await user.addStreak(habitName); // Increment streak using habit name
    res.status(200).json({ message: "Streak added successfully", habits: user.habits });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});


export default router;
