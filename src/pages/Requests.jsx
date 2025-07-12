import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Requests = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const resSent = await axios.get(`/api/request/sent/${user._id}`);
        const resReceived = await axios.get(`/api/request/received/${user._id}`);
        setSent(resSent.data);
        setReceived(resReceived.data);
      } catch (err) {
        console.error("❌ Error fetching requests", err);
      }
    };

    fetchRequests();
  }, [user._id]);

  const handleDecision = async (id, status) => {
    try {
      await axios.put(`/api/request/status/${id}`, { status });
      setReceived((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert("Failed to update request status");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        {/* 🔵 Received Requests */}
        <h2 className="text-xl font-bold mb-4">Received Requests</h2>
        {received.length === 0 ? (
          <p className="text-gray-400">No received requests.</p>
        ) : (
          received.map((r) => (
            <div key={r._id} className="bg-gray-800 p-4 mb-3 rounded-lg">
              <p><strong>{r.from.name}</strong> sent you a request.</p>

              {/* ✅ Only buttons or final message */}
              {r.status === "Accepted" ? (
                <p className="text-sm italic text-green-400 mt-2">
                  You have accepted this request.
                </p>
              ) : r.status === "Rejected" ? (
                <p className="text-sm italic text-red-400 mt-2">
                  You have rejected this request.
                </p>
              ) : (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDecision(r._id, "Accepted")}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(r._id, "Rejected")}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {/* 🟡 Sent Requests */}
        <h2 className="text-xl font-bold mt-10 mb-4">Sent Requests</h2>
        {sent.length === 0 ? (
          <p className="text-gray-400">You haven't sent any requests.</p>
        ) : (
          sent.map((r) => (
            <div key={r._id} className="bg-gray-800 p-4 mb-3 rounded-lg">
              <p>You sent a request to <strong>{r.to.name}</strong>.</p>
              <p className="text-sm text-gray-400 mt-1">
                Status:{" "}
                <span
                  className={
                    r.status === "Accepted"
                      ? "text-green-400 font-semibold"
                      : r.status === "Rejected"
                      ? "text-red-400 font-semibold"
                      : "text-yellow-300 font-semibold"
                  }
                >
                  {r.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
