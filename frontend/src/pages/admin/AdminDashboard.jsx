import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaBars,
  FaTachometerAlt,
  FaTags,
  FaClipboardList,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">

          <h2>ShopEase</h2>

          <span>Admin Panel</span>

        </div>

        <ul>

          <li className="active">

            <FaTachometerAlt />

            Dashboard

          </li>

          <li>

            <FaBoxOpen />

            Products

          </li>

          <li>

            <FaTags />

            Categories

          </li>

          <li>

            <FaClipboardList />

            Orders

          </li>

          <li>

            <FaUserFriends />

            Users

          </li>

          <li>

            <FaCog />

            Settings

          </li>

        </ul>

        <button className="logout-btn">

          <FaSignOutAlt />

          Logout

        </button>

      </aside>

      {/* Main */}

      <main className="dashboard">

        {/* Header */}

        <header className="dashboard-header">

          <div>

            <h1>Dashboard</h1>

            <p>Welcome back, Admin 👋</p>

          </div>

          <button className="menu-btn">

            <FaBars />

          </button>

        </header>

        {/* Cards */}

        <section className="cards">

          <div className="card revenue">

            <FaDollarSign className="card-icon" />

            <div>

              <h3>Total Revenue</h3>

              <h2>₹2,45,000</h2>

            </div>

          </div>

          <div className="card orders">

            <FaShoppingCart className="card-icon" />

            <div>

              <h3>Total Orders</h3>

              <h2>1,245</h2>

            </div>

          </div>

          <div className="card products">

            <FaBoxOpen className="card-icon" />

            <div>

              <h3>Total Products</h3>

              <h2>320</h2>

            </div>

          </div>

          <div className="card users">

            <FaUsers className="card-icon" />

            <div>

              <h3>Total Users</h3>

              <h2>890</h2>

            </div>

          </div>

        </section>

        {/* Placeholder Sections */}

        <section className="dashboard-sections">

          <div className="section-box">

            <h2>Revenue Overview</h2>

            <div className="placeholder">

              Revenue Chart

            </div>

          </div>

          <div className="section-box">

            <h2>Recent Orders</h2>

            <div className="placeholder">

              Orders Table

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;