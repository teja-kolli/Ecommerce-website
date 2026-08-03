import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaSave,
} from "react-icons/fa";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      await axios.put("/profile/", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully.");
    } catch (error) {
      console.log(error);
      alert("Unable to update profile.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  if (loading) {
    return (
      <h2 className="profile-loading">
        Loading Profile...
      </h2>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            <FaUser />
          </div>

          <div>

            <h2>{profile.username}</h2>

            <p>{profile.email}</p>

          </div>

        </div>

        <form onSubmit={saveProfile}>

          <div className="form-group">

            <label>
              <FaUser />
              Username
            </label>

            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>
              <FaEnvelope />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>
              <FaPhone />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>
              <FaMapMarkerAlt />
              Address
            </label>

            <textarea
              rows="4"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />

          </div>

          <div className="profile-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              <FaSave />
              Save Changes
            </button>

            <button
              type="button"
              className="logout-btn"
              onClick={logout}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Profile;