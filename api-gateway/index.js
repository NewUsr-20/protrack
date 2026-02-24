const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Allows the gateway to read incoming data

// --- BULLETPROOF ROUTING ---

// 1. Forward to Task Service (Port 3001)
// 1. Forward to Task Service (Port 3001)
// Using a string starting with the path - Express treats this as a prefix
app.use('/api/tasks', async (req, res) => {
    try {
        // We manually construct the URL to handle IDs (e.g., /api/tasks/1)
        const pathAfterApi = req.originalUrl.replace('/api/tasks', '');
        const targetUrl = `http://localhost:3001/tasks${pathAfterApi}`;
        
        const options = {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
        };
        
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            options.body = JSON.stringify(req.body);
        }

        const response = await fetch(targetUrl, options);
        const data = await response.json();
        res.status(response.status).json(data);
        
    } catch (error) {
        console.error("Task Service Error:", error);
        res.status(500).json({ error: "Task Service is currently down." });
    }
});

// 2. Forward to Note Service (Port 3002)
app.use('/api/notes', async (req, res) => {
    try {
        const pathAfterApi = req.originalUrl.replace('/api/notes', '');
        const targetUrl = `http://localhost:3002/notes${pathAfterApi}`;
        
        const options = {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
        };
        
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            options.body = JSON.stringify(req.body);
        }

        const response = await fetch(targetUrl, options);
        const data = await response.json();
        res.status(response.status).json(data);
        
    } catch (error) {
        console.error("Note Service Error:", error);
        res.status(500).json({ error: "Note Service is currently down." });
    }
});

// A simple health check route
app.get('/', (req, res) => {
    res.send('API Gateway is running smoothly!');
});

// Start the Gateway
app.listen(PORT, () => {
    console.log(`API Gateway is live and running on http://localhost:${PORT}`);
});