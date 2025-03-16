const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();
const todosStr = 'API : Todos';

// Create a todo

router.post('/todos', async (req, res) => {
    console.log(`POST : ${todosStr}`);

    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send(todo);
    } catch (err) {
        res.status(500).send('Unable to create Todo. Please try after sometime.');
    }
});

// Get all todos

router.get('/todos', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send('Unable to fetch Todo. Please try after sometime.');
    }
});


// Edit a todo

router.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send('Unable to update Todo');
    }
});

// Delete a todo

router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.send("Todo deleted successfully");
    } catch (error) {
        res.status(500).send('Unable to delete Todo');
    }
});

module.exports = router;



