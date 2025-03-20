import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSignup = (e) => {
    e.preventDefault();
    axios.post('/api/register',{username,email,password})
    .then(
      result => {
        console.log(result)
        navigate("/login");
      }
    )
    .catch(err => console.log("Found Error: ",err));
    // console.log("Signup successful!");
    // navigate("/profile"); // Redirect to Home after signup
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="text" placeholder="Enter your name" required 
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" required 
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Create a password" required
            onChange={(e) => setPassword(e.target.value)}
          />
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
