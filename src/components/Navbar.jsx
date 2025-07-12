import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onFilterChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth";
  };

  const handleAvailabilityChange = (e) => {
    const selected = e.target.value;
    onFilterChange(selected === "All" ? "" : selected);
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <h1 className="text-xl font-bold">Skill Swap Platform</h1>

      <div className="flex gap-4 items-center">
        <select
          onChange={handleAvailabilityChange}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="All">Availability</option>
          <option value="Weekends">Weekends</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Evenings">Evenings</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />

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
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
