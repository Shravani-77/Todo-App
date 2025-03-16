const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./connection/database');
const { seedUsers } = require("./utils/seed-data/users");

// Routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http:/localhost:4200'}));
app.use('/api', todoRoutes);

// MongoDB 
connectDB();

seedUsers();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






