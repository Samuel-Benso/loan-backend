// app.js (The Main File)

// Import and configure dotenv to use environment variables
require('dotenv').config();

// Import express
const express = require("express");
const mongoose = require("mongoose");
// Import the new routes file
const loanRoutes = require("./routes/loanRoutes"); 

// Create the app
const app = express();

// --- Middleware & DB Connection ---
app.use(express.json()); // Enable reading user input

// Use the environment variable for the connection string
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

// --- Basic Route ---
app.get("/", (req, res) => {
  res.send("Hello, backend!");
});

// --- KEY CHANGE: Use the new Routes file for all /loans requests ---
// Any request that starts with /loans will be handled by loanRoutes.js
app.use("/loans", loanRoutes); 

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});