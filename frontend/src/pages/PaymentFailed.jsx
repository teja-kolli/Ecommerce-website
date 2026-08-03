import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaRedo,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./PaymentFailed.css";

function PaymentFailed() {
  return (
    <div className="failed-page">

      <div className="failed-card">

        <FaTimesCircle className="failed-icon" />

        <h1>Payment Failed</h1>

        <p>
          Unfortunately, your payment could not be completed.
          This may be due to a network issue, payment cancellation,
          or your bank declining the transaction.
        </p>

        <div className="failed-info">

          <FaExclamationTriangle />

          <span>
            No amount has been deducted if the payment failed.
            If an amount was deducted, it will usually be refunded
            by your bank according to their processing time.
          </span>

        </div>

        <div className="failed-buttons">

          <Link
            to="/payment"
            className="retry-btn"
          >

            <FaRedo />

            Retry Payment

          </Link>

          <Link
            to="/checkout"
            className="back-btn"
          >

            <FaArrowLeft />

            Back to Checkout

          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentFailed;