const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    tags: [String],
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    users: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
