import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>Mind Space</h1>
        <p>Take Charge of Your Mind. Find Balance with MindSpace</p>
        <nav>
          <a href="/">Home</a>
          <a href="/about">Contact Us</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Calm Your Mind, Empower Your Life</h2>
        <h2>Small steps today for a better, brighter tomorrow</h2>
        <p>
          <i>
            Life can be overwhelming, but finding balance doesn't have to be.
            MindSpace empowers you with tools to track your emotions, build
            daily habits, and stay inspired with positive reminders. Explore
            your personal growth at your own pace, surrounded by a community
            that cares. Start small, grow big, and make every moment count.
          </i>
        </p>
      </section>

      <section>
        <h2>Get Started</h2>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </section>

      <footer>
        <p>Team MindSpace | Designed with ❤️</p>
        <p>
          <a href="/about">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
