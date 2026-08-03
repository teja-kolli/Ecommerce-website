import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import axios, { isLoggedIn } from "../api/axios";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [navigate]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart/");
      setCartItems(res.data.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await axios.patch(`/cart/items/${item.id}/`, {
        quantity: item.quantity + 1,
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) return;

    try {
      await axios.patch(`/cart/items/${item.id}/`, {
        quantity: item.quantity - 1,
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/cart/items/${id}/`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <h2 className="loading">
        Loading Cart...
      </h2>
    );
  }

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>Your cart is empty</h2>

          <p>Add some amazing products!</p>

          <Link to="/products" className="shop-link">Browse Products</Link>

        </div>

      ) : (

        <div className="cart-container">

          <div className="cart-items">

            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={
                    item.product.image ||
                    "https://via.placeholder.com/120"
                  }
                  alt={item.product.name}
                />

                <div className="cart-info">

                  <h3>{item.product.name}</h3>

                  <p>
                    ₹{item.product.price}
                  </p>

                </div>

                <div className="quantity-box">

                  <button
                    onClick={() =>
                      decreaseQuantity(item)
                    }
                  >
                    <FaMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item)
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

                <div className="item-total">

                  ₹
                  {(
                    Number(item.product.price) *
                    item.quantity
                  ).toFixed(2)}

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

          <div className="summary">

    <h2>Order Summary</h2>

    <div className="summary-row">
        <span>Items</span>
        <span>{cartItems.length}</span>
    </div>

    <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
    </div>

    <div className="summary-row">
        <span>Shipping</span>
        <span>
            {subtotal > 1000 ? "Free" : "₹99"}
        </span>
    </div>

    <div className="summary-row">
        <span>Discount</span>
        <span>- ₹0</span>
    </div>

    <hr />

    <div className="total">

        <span>Total</span>

        <span>
            ₹
            {(
                subtotal +
                (subtotal > 1000 ? 0 : 99)
            ).toFixed(2)}
        </span>

    </div>

    <button
      className="checkout-btn"
      onClick={() => navigate("/checkout")}
    >
        Proceed to Checkout
    </button>

</div>

        </div>

      )}

    </div>
  );
}

export default Cart;
