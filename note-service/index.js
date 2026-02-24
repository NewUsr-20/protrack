const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary "Database" for Notes
let notes = [
    { 
        id: 1, 
        subject: "Microservice Architecture", 
        content: "Remember to containerize with Docker once the backend is connected to the database.", 
        date: new Date().toLocaleDateString()
    }
];

// --- ROUTES ---

// 1. READ all notes (GET)
app.get('/notes', (req, res) => {
    res.json(notes);
});

// 2. CREATE a new note (POST)
app.post('/notes', (req, res) => {
    const newNote = {
        id: Date.now(), // Unique ID
        subject: req.body.subject,
        content: req.body.content,
        date: new Date().toLocaleDateString()
    };
    
    // Add the newest note to the BEGINNING of the array
    notes.unshift(newNote); 
    res.status(201).json(newNote);
});

// 3. DELETE a note (DELETE)
app.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== noteId);
    res.json({ message: `Note ${noteId} deleted successfully!` });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Note Service is live and running on http://localhost:${PORT}`);
});