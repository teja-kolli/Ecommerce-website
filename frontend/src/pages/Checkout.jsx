import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import axios, { isLoggedIn } from "../api/axios";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    axios
      .get("/cart/")
      .then((res) => setCartItems(res.data.items || []))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);

    try {
      const res = await axios.post("/orders/create/");
      setOrderId(res.data.id);
      setSuccess(true);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (success) {
    return (
      <div className="checkout-success">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Your order #{orderId} has been confirmed.</p>
        <div className="success-actions">
          <Link to="/profile">View Orders</Link>
          <Link to="/products" className="secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>
            <FaMapMarkerAlt /> Shipping Address
          </h2>

          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={address.address}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={address.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <h2>
            <FaCreditCard /> Payment
          </h2>
          <p className="payment-note">
            Cash on Delivery — pay when your order arrives.
          </p>

          <button type="submit" className="place-order-btn" disabled={placing}>
            {placing ? "Placing Order..." : `Place Order — ₹${total.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="summary-item" key={item.id}>
              <img
                src={item.product.image || "https://via.placeholder.com/60"}
                alt={item.product.name}
              />
              <div>
                <h4>{item.product.name}</h4>
                <p>Qty: {item.quantity}</p>
              </div>
              <span>₹{(Number(item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
