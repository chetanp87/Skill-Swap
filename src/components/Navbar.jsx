import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onFilterChange }) => {
  const [user, setUser] = useState(null);
  const [hasRequests, setHasRequests] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?._id) {
      axios
        .get(`/api/request/received/${storedUser._id}`)
        .then((res) => {
          setHasRequests(res.data.length > 0);
        })
        .catch((err) => {
          console.error("Failed to check requests:", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth";
  };

  const handleAvailabilityChange = (e) => {
    const selected = e.target.value;
    onFilterChange?.(selected === "All" ? "" : selected); // safe call
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <h1 className="text-xl font-bold">Skill Swap Platform</h1>

      <div className="flex gap-4 items-center">
        {/* ✅ Requests Button */}
        {user && (
          <Link to="/requests">
            <button className="bg-indigo-600 px-3 py-2 rounded text-sm">
              {hasRequests ? "🔔 Requests" : "Requests"}
            </button>
          </Link>
        )}

        {/* ✅ Availability Filter */}
        <select
          onChange={handleAvailabilityChange}
          className="bg-gray-800 text-white px-3 py-2 rounded text-sm"
        >
          <option value="All">Availability</option>
          <option value="Weekends">Weekends</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Evenings">Evenings</option>
        </select>

        {/* ✅ Search (not working yet) */}
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 text-sm"
        />

        {/* ✅ User Avatar or Login */}
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm uppercase hover:scale-105 transition">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
