import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, CheckCircle2, Quote } from "lucide-react";
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [quote, setQuote] = useState(null);
  const [quoteCategory, setQuoteCategory] = useState("motivational");

  const categories = [
    { id: "motivational", label: "Motivational" },
    { id: "mindfulness", label: "Mindfulness" },
    { id: "success", label: "Success" },
    { id: "happiness", label: "Happiness" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
      fetchQuote(token);
    } else {
      window.location.href = "/login";
    }
  }, [quoteCategory]);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setHabits(response.data.habits);
    } catch (error) {
      setMessage({ text: "Error fetching profile data", type: "error" });
    }
  };

  const fetchQuote = async (token) => {
    try {
      const response = await axios.get(`/api/quote?category=${quoteCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuote(response.data);
    } catch (error) {
      setMessage({ text: "Error fetching quote", type: "error" });
    }
  };

  const handleAddHabit = async () => {
    if (!newHabit.trim()) {
      setMessage({ text: "Please enter a habit name", type: "error" });
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/profile/add-habit",
        { newHabit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits(response.data.habits);
      setNewHabit("");
      setMessage({ text: "Habit added successfully!", type: "success" });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || "Error adding habit", 
        type: "error" 
      });
    }
  };

  const handleStreak = async (habitName) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/profile/add-streak",
        { habitName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits(response.data.habits);
      setMessage({ text: "Streak updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ 
        text: "You already counted your streak for today, or the streak was reset.",
        type: "error"
      });
    }
  };

  if (!user) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Welcome, {user.username}!</h2>
      </div>

      <div className="quote-section">
        <div className="quote-header">
          <Quote size={24} />
          <h3>Daily Inspiration</h3>
        </div>
        <div className="quote-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setQuoteCategory(category.id)}
              className={`category-btn ${quoteCategory === category.id ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>
        {quote && (
          <div className="quote-content">
            <p>"{quote.text}"</p>
            {quote.author && <p className="quote-author">- {quote.author}</p>}
          </div>
        )}
      </div>

      <div className="habits-section">
        <div className="habits-header">
          <h3>Your Habits</h3>
        </div>

        <div className="add-habit-form">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter a new habit"
            className="habit-input"
          />
          <button onClick={handleAddHabit} className="add-btn">
            <PlusCircle size={20} />
            Add Habit
          </button>
        </div>

        <div className="habits-list">
          {habits.length === 0 ? (
            <p className="text-center text-gray-500">
              Start building better habits by adding your first one!
            </p>
          ) : (
            habits.map((habit, index) => (
              <div key={index} className="habit-item">
                <div className="habit-info">
                  <h4>{habit.name}</h4>
                  <p className="habit-streak">Current streak: {habit.streak} days</p>
                </div>
                <button
                  onClick={() => handleStreak(habit.name)}
                  className="streak-btn"
                >
                  <CheckCircle2 size={20} />
                  Complete Today
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Profile;