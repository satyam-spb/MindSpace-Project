import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Profile.css'; // Link to CSS file for styling

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [message, setMessage] = useState("");

  //fetch user data from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:8000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUser(response.data);
          setHabits(response.data.habits);
        })
        .catch((error) => console.log("Error fetching profile:", error));
    } else {
      window.location.href = "/login"; // Redirect to login if no token
    }
  }, []);

  const handleAddHabit = () => {
    if (!newHabit) {
      setMessage("Please enter a habit name.");
      return;
    }
    const token = localStorage.getItem("token");
    axios.post("http://localhost:8000/profile/add-habit", 
      { newHabit: newHabit }, 
      {headers: { Authorization: `Bearer ${token}` }}
    )
      .then((response) => {
        setHabits(response.data.habits);
        setNewHabit(""); // Clear input
        setMessage("Habit added successfully!");
      })
      .catch((error) => console.log("Error adding habit:", error));
  };

  const handleStreak = (habitName) => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:8000/profile/add-streak",
      { habitName },
      {headers: { Authorization: `Bearer ${token}` }}
    )
      .then((response) => {
        setHabits(response.data.habits);
      })
      .catch((error) => {
        setMessage("You already counted your streak for today, or the streak was reset.");
        console.log("Error updating streak:", error);
      });
  };
  

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>{user.username}'s Profile</h2>
          <div className="habits-section">
            <h3>Your Habits</h3>
            {habits.length === 0 ? (
              <div>
                <p>You currently don't have any habits. Add one!</p>
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter a new habit"
                />
                <button onClick={handleAddHabit}>Add Habit</button>
              </div>
            ) : (
              <div>
                  <ul>
                  {habits.map((habit, index) => (
                    <li key={index}>
                      <p>{habit.name} - Streak: {habit.streak}</p>
                      <button onClick={() => handleStreak(habit.name)}>
                        Add Streak
                      </button>
                    </li>
                  ))}
                  </ul>
                  <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter a new habit"
                />
                <button onClick={handleAddHabit}>Add Habit</button>
                
              </div>
              
              
            )}
            {message && <p className="message">{message}</p>}
          </div>
          <p>
            Go to Home <a href="/">Home</a>
          </p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
