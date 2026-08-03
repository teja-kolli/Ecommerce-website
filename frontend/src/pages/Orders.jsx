import { useEffect, useState } from "react";
import {
  FaBox,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import axios from "../api/axios";
import "./Orders.css";

function Orders() {
  
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "pending";
      case "processing":
        return "processing";
      case "shipped":
        return "shipped";
      case "delivered":
        return "delivered";
      case "cancelled":
        return "cancelled";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <h2 className="orders-loading">
        Loading Orders...
      </h2>
    );
  }
  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <FaBox className="empty-icon" />

          <h2>No Orders Yet</h2>

          <p>
            Your orders will appear here after
            you place one.
          </p>

        </div>

      ) : (

        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <div className="order-header">

              <div>

                <h3>
                  Order #{order.id}
                </h3>

                <p>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`status ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status}
              </span>

            </div>

            <div className="order-summary">

              <div>

                <strong>Total</strong>

                <p>
                  ₹
                  {Number(
                    order.total_amount
                  ).toFixed(2)}
                </p>

              </div>

              <div>

                <strong>Items</strong>

                <p>
                  {order.items.length}
                </p>

              </div>

              <button
                className="details-btn"
                onClick={() =>
                  toggleOrder(order.id)
                }
              >

                {expandedOrder ===
                order.id ? (
                  <>
                    Hide Details
                    <FaChevronUp />
                  </>
                ) : (
                  <>
                    View Details
                    <FaChevronDown />
                  </>
                )}

              </button>

            </div>

            {expandedOrder === order.id && (

              <div className="order-items">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="order-item"
                  >

                    <img
                      src={
                        item.product_image ||
                        "https://via.placeholder.com/100"
                      }
                      alt={
                        item.product_name
                      }
                    />

                    <div className="item-info">

                      <h4>
                        {
                          item.product_name
                        }
                      </h4>

                      <p>
                        Qty :
                        {item.quantity}
                      </p>

                    </div>

                    <div className="item-price">

                      ₹
                      {(
                        Number(
                          item.price
                        ) *
                        item.quantity
                      ).toFixed(2)}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;