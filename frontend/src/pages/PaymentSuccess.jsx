import { Link, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaClipboardList,
  FaReceipt,
} from "react-icons/fa";
import "./PaymentSuccess.css";

function PaymentSuccess() {

  const location = useLocation();

  const payment = location.state || {};

  return (

    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Payment Successful!</h1>

        <p>
          Thank you for shopping with ShopEase.
          Your payment has been processed successfully.
        </p>

        <div className="payment-details">

          <div className="detail">

            <span>Order ID</span>

            <strong>
              #{payment.order_id || "N/A"}
            </strong>

          </div>

          <div className="detail">

            <span>Payment ID</span>

            <strong>
              {payment.payment_id || "N/A"}
            </strong>

          </div>

          <div className="detail">

            <span>Amount Paid</span>

            <strong>
              ₹{payment.amount || "0.00"}
            </strong>

          </div>

          <div className="detail">

            <span>Status</span>

            <strong className="paid">
              Paid
            </strong>

          </div>

        </div>

        <div className="success-buttons">

          <Link
            to="/orders"
            className="orders-btn"
          >

            <FaClipboardList />

            View Orders

          </Link>

          <Link
            to="/products"
            className="shop-btn"
          >

            <FaShoppingBag />

            Continue Shopping

          </Link>

        </div>

        <div className="invoice">

          <FaReceipt />

          <span>
            Invoice will be available in
            your Orders section.
          </span>

        </div>

      </div>

    </div>

  );

}

export default PaymentSuccess;