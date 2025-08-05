const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

// In-memory store for todos and ID counter
let todos = [];
let nextId = 1;

// API ROUTES

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: 'Task is required' });
  }
  const newTodo = { id: nextId++, task };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  res.status(200).send(todos);
});

// GET /todos/:id - Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    res.status(200).send(todo);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

// PUT /todos/:id - Update a specific todo by ID
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: 'Task is required' });
  }
  const todoIndex = todos.findIndex(t => t.id === todoId);
  if (todoIndex !== -1) {
    todos[todoIndex].task = task;
    res.status(200).send(todos[todoIndex]);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

// DELETE /todos/:id - Delete a specific todo by ID
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(t => t.id === todoId);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(200).send({ message: 'Todo deleted successfully', todo: deletedTodo[0] });
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

// POST /testing/reset - Reset data for testing purposes
if (process.env.NODE_ENV === 'test') {
  app.post('/testing/reset', (req, res) => {
    todos = [];
    nextId = 1;
    res.status(200).send({ message: 'Data reset successfully' });
  });
}

// All other routes should redirect to the Angular app
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

module.exports = app; // Export app for testing
