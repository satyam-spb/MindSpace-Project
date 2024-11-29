import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Fetch user profile on mount
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const fetchQuote = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/quote", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuote(res.data.text);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {user.fullName}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={fetchQuote}>Get Motivational Quote</button>
      {quote && <p style={{ marginTop: "20px", fontStyle: "italic" }}>{quote}</p>}
    </div>
  );
};

export default Profile;
