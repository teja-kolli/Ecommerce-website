import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios, { isLoggedIn } from "../api/axios";
import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/cart/add/", {
        product: product.id,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      alert("Failed to add product to cart.");
    }
  };

  const addToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/wishlist/add/", { product: product.id });
      alert("Added to wishlist!");
    } catch (error) {
      alert("Failed to add to wishlist.");
    }
  };

  return (
    <div className="product-card">
      <span className="discount-badge">20% OFF</span>

      <button className="wishlist-btn" onClick={addToWishlist}>
        <FaHeart />
      </button>

      <Link to={`/products/${product.id}`}>
        <img
          src={product.image || "https://via.placeholder.com/300x300"}
          alt={product.name}
        />
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <span>(120)</span>
        </div>

        <div className="price">
          <h2>₹{product.price}</h2>
          <del>₹{(Number(product.price) * 1.25).toFixed(0)}</del>
        </div>

        <button className="cart-btn" type="button" onClick={addToCart}>
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
