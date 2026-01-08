import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send the registration data to Djoser
      await axios.post("https://campus-backend-75cs.onrender.com/auth/users/", {
        username,
        email,
        password,
      });

      console.log("Registration Success!");
      alert("Account created! Please log in.");

      // 2. Redirect to Login page so they can get their token
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error.response.data);
      // Helpful error message (e.g., "Username already taken")
      alert("Error: " + JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up for Campus Marketplace</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
