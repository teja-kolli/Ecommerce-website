import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {

   console.log(localStorage.getItem("access"));
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🔥 Summer Sale 2026</span>

          <h1>Everything You Need, All in One Place</h1>

          <p>
            Discover premium products with amazing offers, fast delivery,
            and secure payments.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="explore-btn">Explore</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900"
            alt="Shopping"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">

        <div className="feature-card">
          <FaTruck className="feature-icon" />
          <h3>Free Delivery</h3>
          <p>Free shipping on orders above ₹999</p>
        </div>

        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Secure Payment</h3>
          <p>100% safe & secure checkout</p>
        </div>

        <div className="feature-card">
          <FaUndoAlt className="feature-icon" />
          <h3>Easy Returns</h3>
          <p>7-day hassle-free return policy</p>
        </div>

        <div className="feature-card">
          <FaHeadset className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Always here to help you</p>
        </div>

      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">

          <div className="category-card">💻 Electronics</div>

          <div className="category-card">👕 Fashion</div>

          <div className="category-card">🏠 Home</div>

          <div className="category-card">📱 Mobiles</div>

          <div className="category-card">⌚ Accessories</div>

          <div className="category-card">🎮 Gaming</div>

        </div>
      </section>

      {/* Latest Products */}
      <section className="latest-products">

        <div className="section-header">
          <h2>Latest Products</h2>
          <p>Browse our newest arrivals</p>
        </div>

        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <h3>No Products Available</h3>
          )}
        </div>

      </section>
    </>
  );
}

export default Home;