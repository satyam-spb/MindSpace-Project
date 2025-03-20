import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'; // Ensure the CSS file is linked
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      navigate("/profile");
    })
    .catch((err) => {
      console.error("Error:", err.response?.data || err.message);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            id="password-input"
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>
        Create New Account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
