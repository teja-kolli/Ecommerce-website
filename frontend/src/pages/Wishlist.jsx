import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import axios from "../api/axios";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("/wishlist/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Wishlist Response:", res.data);

      setWishlist(res.data.items || []);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("access");

      await axios.delete(`/wishlist/remove/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) =>
        prev.filter((item) => item.product !== productId)
      );
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Unable to remove item.");
    }
  };

  const moveToCart = async (productId) => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/cart/add/",
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await removeWishlist(productId);

      alert("Moved to Cart");
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Unable to move item to cart.");
    }
  };

  if (loading) {
    return (
      <h2 className="wishlist-loading">
        Loading Wishlist...
      </h2>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <FaHeart className="empty-icon" />

          <h2>Your wishlist is empty</h2>

          <p>Save products you love for later.</p>

          <Link
            to="/products"
            className="shop-btn"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div
              className="wishlist-card"
              key={item.id}
            >
              <Link to={`/products/${item.product}`}>
                <img
                  src={
                    item.product_image
                      ? item.product_image
                      : "https://via.placeholder.com/300x250?text=No+Image"
                  }
                  alt={item.product_name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x250?text=No+Image";
                  }}
                />
              </Link>

              <div className="wishlist-content">
                <h3>{item.product_name}</h3>

                <p className="price">
                  ₹{item.product_price}
                </p>

                <div className="wishlist-buttons">
                  <button
                    className="cart-btn"
                    onClick={() => moveToCart(item.product)}
                  >
                    <FaShoppingCart />
                    Move to Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeWishlist(item.product)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;