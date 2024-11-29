import React from "react";

const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    alert("Sign Up functionality submitted!");
    // Add your sign-up logic here, like calling an API
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Full Name: </label>
          <input type="text" placeholder="Enter your full name" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email: </label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password: </label>
          <input type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
