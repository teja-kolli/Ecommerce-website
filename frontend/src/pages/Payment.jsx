import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import axios from "../api/axios";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestOrder();
  }, []);

  const fetchLatestOrder = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("/orders/latest/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.post(
        "/payments/create-order/",
        {
          order_id: order.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        order_id: res.data.order_id,

        name: "ShopEase",

        description: "Secure Payment",

        handler: async function (response) {

          await axios.post(
            "/payments/verify/",
            {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          navigate("/payment-success");
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        navigate("/payment-failed");
      });

      razor.open();

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="payment-page">

      <div className="payment-container">

        <div className="payment-left">

          <h1>Secure Payment</h1>

          <div className="payment-card">

            <h3>

              <FaCreditCard />

              Payment Method

            </h3>

            <div className="method active">

              <FaMoneyBillWave />

              Razorpay

            </div>

            <div className="security">

              <FaShieldAlt />

              <span>
                Your payment is secured by
                Razorpay (256-bit SSL Encryption)
              </span>

            </div>

            <div className="security">

              <FaLock />

              <span>
                Safe & Secure Checkout
              </span>

            </div>

          </div>

        </div>

        <div className="payment-right">

          <h2>Order Summary</h2>

          <div className="summary">

            <div>

              <span>Order ID</span>

              <strong>#{order.id}</strong>

            </div>

            <div>

              <span>Total Items</span>

              <strong>{order.items.length}</strong>

            </div>

            <div>

              <span>Subtotal</span>

              <strong>
                ₹{order.total_amount}
              </strong>

            </div>

            <div>

              <span>Shipping</span>

              <strong>Free</strong>

            </div>

            <hr />

            <div className="grand-total">

              <span>Total</span>

              <h2>
                ₹{order.total_amount}
              </h2>

            </div>

            <button
              className="pay-btn"
              onClick={handlePayment}
            >
              Pay Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;