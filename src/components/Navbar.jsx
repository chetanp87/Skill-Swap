import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <h1 className="text-xl font-bold">Skill Swap Platform</h1>
      <div className="flex gap-4 items-center">
        <select className="bg-gray-800 text-white px-3 py-2 rounded">
          <option>Availability</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <Link to="/auth">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
