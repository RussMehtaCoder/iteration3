const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sessionRoutes = require('./routes/sessions');
const paymentRoutes = require('./routes/payments');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

// session routes
app.use('/sessions', sessionRoutes);

// payment routes
app.use('/payments', paymentRoutes);

// message routes
app.use('/messages', messageRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
