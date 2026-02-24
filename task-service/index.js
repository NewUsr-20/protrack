const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allows other services/frontends to talk to this one
app.use(express.json()); // Allows this API to read JSON data from requests

// Temporary "Database" (We will replace this with a real database later)
let tasks = [
    { 
        id: 1, 
        title: "Set up Task Service", 
        brief_note: "Created index.js and started the server", 
        status: "Done" 
    }
];

// Routes
// When someone visits http://localhost:3001/tasks, send back the tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
// --- NEW ROUTES ---

// 1. CREATE a new task (POST)
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1, // Simple way to generate a new ID
        title: req.body.title,
        brief_note: req.body.brief_note,
        status: req.body.status || "To-Do" // Default to "To-Do" if not provided
    };
    
    tasks.push(newTask); // Add it to our temporary database
    res.status(201).json(newTask); // Send the new task back as confirmation
});

// 2. DELETE a task (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Keep only the tasks that DO NOT match the ID we want to delete
    tasks = tasks.filter(task => task.id !== taskId);
    
    res.json({ message: `Task ${taskId} deleted successfully!` });
});
// Start the Server
app.listen(PORT, () => {
    console.log(`Task Service is live and running on http://localhost:${PORT}`);
});