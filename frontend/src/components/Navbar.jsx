import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { isLoggedIn, logout } from "../api/axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const checkAuth = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Shop<span>Ease</span>
        </Link>

        <SearchBar />

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {loggedIn ? (
            <>
              <Link to="/wishlist" className="icon">
                <FaHeart />
              </Link>
              <Link to="/cart" className="icon">
                <FaShoppingCart />
              </Link>
              <Link to="/profile" className="icon">
                <FaUser />
              </Link>
              <button className="logout-nav-btn" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
              
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-link">
                Register
              </Link>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
