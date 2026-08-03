import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/login/", formData);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Sign in to continue shopping</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <FaEnvelope className="icon" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-box">

            <FaLock className="icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {showPassword ? (
              <FaEyeSlash
                className="eye"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="eye"
                onClick={() => setShowPassword(true)}
              />
            )}

          </div>

          {error && <p className="error">{error}</p>}

          <button className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="login-footer">

          <span>Don't have an account?</span>

          <Link to="/register"> Register</Link>

        </div>

      </div>

    </div>
  );
}

export default Login;