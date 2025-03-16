const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();
const json2csv = require('json2csv').parse;
const todosStr = 'API : Todos';

// Create a todo
router.post('/todos', async (req, res) => {
    console.log(`POST : ${todosStr}`);

    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send(todo);
    } catch (err) {
        res.status(500).send('Unable to creata Todo. Please try after sometime.');
    }
});

// Get all todos
router.get('/todos', async (req, res) => {
    console.log(`GET : ${todosStr}`);
    
    const { page = 1, limit = 5 } = req.query; // Default values
    const todos = await Todo.find()
                            .skip((page - 1) * limit)
                            .limit(parseInt(limit));
    
    const totalCount = await Todo.countDocuments();
    res.send({
        todos,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page)
    });
});

// Edit a todo
router.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(todo);
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.send({ message: "Todo deleted successfully" });
});


 

router.get('/todos/export', async (req, res) => {
    const format = req.query.format || 'json'; // Default to JSON
    const todos = await Todo.find();

    if (format === 'csv') {
        const csv = json2csv(todos);
        res.attachment('todos.csv').send(csv);
    } else {
        res.json(todos);
    }
});
router.post('/todos/upload', async (req, res) => {
    const mentionedUsers = req.body.users || [];
    const validUsers = await User.find({ username: { $in: mentionedUsers } });

    if (mentionedUsers.length !== validUsers.length) {
        return res.status(400).send({ error: "Invalid user mentioned" });
    }

    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send(todo);
});

module.exports = router;



