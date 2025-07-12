import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Requests = () => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch all requests
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

  // ✅ Handle Accept/Reject
  const handleStatus = async (id, status) => {
    try {
      await axios.put(`/api/request/status/${id}`, { status });
      setReceived((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (err) {
      alert("Failed to update request status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Requests</h2>

        {/* 🟦 Received Requests */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Received Requests</h3>
          {received.length === 0 ? (
            <p className="text-gray-400">No incoming requests.</p>
          ) : (
            received.map((req) => (
              <div
                key={req._id}
                className="bg-gray-800 p-4 mb-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p>
                    <span className="font-semibold">{req.from.name}</span> has sent you a skill swap request.
                  </p>
                  <p className="text-sm text-gray-400">Status: {req.status}</p>
                </div>

                {/* ✅ Show buttons only if status is Pending */}
                {req.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(req._id, "Accepted")}
                      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatus(req._id, "Rejected")}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="text-sm italic text-yellow-400">
                    You have {req.status.toLowerCase()} the request.
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* 🟨 Sent Requests */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Sent Requests</h3>
          {sent.length === 0 ? (
            <p className="text-gray-400">You haven't sent any requests.</p>
          ) : (
            sent.map((req) => (
              <div
                key={req._id}
                className="bg-gray-800 p-4 mb-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p>
                    You sent a request to <span className="font-semibold">{req.to.name}</span>
                  </p>
                  <p className="text-sm text-gray-400">Status: {req.status}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    req.status === "Accepted"
                      ? "text-green-400"
                      : req.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-300"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
