import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "../api/axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        const errors = Object.values(err.response.data)
          .flat()
          .join(" ");

        setError(errors);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account 🚀</h1>

        <p>Join ShopEase and start shopping today.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <FaUser className="icon" />

            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-box">

            <FaEnvelope className="icon" />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-box">

            <FaLock className="icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
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

          <div className="input-box">

            <FaLock className="icon" />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {showConfirm ? (
              <FaEyeSlash
                className="eye"
                onClick={() => setShowConfirm(false)}
              />
            ) : (
              <FaEye
                className="eye"
                onClick={() => setShowConfirm(true)}
              />
            )}

          </div>

          {error && (
            <p className="error">{error}</p>
          )}

          <button
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <div className="register-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;