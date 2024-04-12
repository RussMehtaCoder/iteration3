const express = require("express");
const connectDB = require("./connectDb");
const cors = require("cors");
//const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const sessionRoutes = require("./routes/sessions");
const paymentRoutes = require("./routes/payments");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// configure cors
app.use(cors());

// Define authentication routes
//app.use("/auth", authRoutes);

// Define user routes
app.use("/users", userRoutes);

// session routes
app.use("/sessions", sessionRoutes);

// payment routes
app.use("/payments", paymentRoutes);

// message routes
app.use("/messages", messageRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
