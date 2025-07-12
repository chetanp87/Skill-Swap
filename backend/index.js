const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Route files
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const requestRoutes = require("./routes/request.routes");
// const swapRoutes = require("./routes/swap.routes"); // Uncomment if needed

// Load .env config
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/request", requestRoutes);
// app.use("/api/swap", swapRoutes); // Future use

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
