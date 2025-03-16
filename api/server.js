const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { seedUsers } = require("./utils/seed-data/users");

// Routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Sample route
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

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






