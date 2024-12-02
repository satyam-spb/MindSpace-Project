import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [
    {
      name: { type: String, required: true }, // Name of the habit
      streak: { type: Number, default: 0 },   // Streak count, defaults to 0
      lastStreakDate: { type: Date, default: Date.now } // Track last streak update date
    }
  ]
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to match password during login
userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to add streak if it's a valid day
userSchema.methods.addStreak = async function (habitName) {
  // Find the habit by name
  const habit = this.habits.find(h => h.name === habitName);
  if (!habit) {
    throw new Error('Habit not found');
  }

  const today = new Date().setHours(0, 0, 0, 0); // Get today at midnight

  // Check if streak is already counted for today
  if (habit.lastStreakDate?.toISOString().split('T')[0] === new Date(today).toISOString().split('T')[0]) {
    throw new Error('Streak has already been counted for today');
  }

  // Check if the habit missed more than a day
  const lastStreakDate = new Date(habit.lastStreakDate || 0).setHours(0, 0, 0, 0);
  if (today - lastStreakDate > 86400000) { // More than 1 day missed
    habit.streak = 0; // Reset streak if a day is missed
  }

  habit.streak += 1;
  habit.lastStreakDate = today;
  await this.save();
};


const User = mongoose.model('Users', userSchema);
export default User;
