import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup successful!");
    navigate("/"); // Redirect to Home after signup
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="text" placeholder="Enter your name" required />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" required />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Create a password" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
