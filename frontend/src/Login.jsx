import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // This helps us redirect users after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send the username/password to Django
      const response = await axios.post(
        "https://campus-backend-75cs.onrender.com/auth/token/login/",
        {
          username,
          password,
        }
      );

      // 2. If successful, we get a token (e.g., "auth_token": "9a8b7c...")
      const token = response.data.auth_token;

      // 3. Save it in the browser so we don't lose it on refresh
      localStorage.setItem("token", token);

      window.location.href = "/";

      // 4. Redirect the user to the Home page
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
