import React from "react";
import "../styles/about.css"; // Ensure this path is correct

const About = () => {
  return (
    <div>
      <header>
        <h1>About Us</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      <section className="help">
        <h2>Having Trouble? We're here to help</h2>
        <textarea
          name="user-issue"
          id="user-issue"
          placeholder="Mention your issue here"
        ></textarea>
        <button className="submit-btn">Submit</button>
      </section>

      <section className="about-us">
        <h2>Meet the team</h2>
        <div className="team-grid">
          <div className="member">
            <img src="" alt="NA" />
            <h4>Sunidhi Prabhu</h4>
            <p>Founder and Developer</p>
          </div>
          <div className="member">
            <img src="" alt="NA" />
            <h4>Satyam Pratik Bharti</h4>
            <p>Founder and Developer</p>
          </div>
        </div>
      </section>

      <footer>
        <p> Team MindSpace | Designed with ❤️</p>
        <p>
          <a href="/about">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default About;
