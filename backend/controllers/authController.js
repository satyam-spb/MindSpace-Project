import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '3d' });

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    const token = generateToken(newUser._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
