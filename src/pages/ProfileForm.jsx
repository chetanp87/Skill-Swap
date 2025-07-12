import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileForm = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [form, setForm] = useState({
    name: storedUser.name || "",
    offers: [],
    wants: [],
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="offers"
          placeholder="Skills you offer (comma separated)"
          onChange={(e) => handleListChange("offers", e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="wants"
          placeholder="Skills you want to learn (comma separated)"
          onChange={(e) => handleListChange("wants", e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Availability</option>
          <option value="Weekends">Weekends</option>
          <option value="Evenings">Evenings</option>
          <option value="Weekdays">Weekdays</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
