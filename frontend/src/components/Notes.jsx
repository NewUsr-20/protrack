import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  // GET Request (Updated to Port 3000)
  useEffect(() => {
    fetch('http://localhost:3000/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error("Error fetching notes:", error));
  }, []);

  // POST Request (Updated to Port 3000)
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return; 

    const newNoteData = {
      subject: subject,
      content: content
    };

    fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNoteData)
    })
      .then(response => response.json())
      .then(createdNote => {
        setNotes([createdNote, ...notes]);
        setSubject('');
        setContent('');
      })
      .catch(error => console.error("Error adding note:", error));
  };

  // DELETE Request (Updated to Port 3000)
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => console.error("Error deleting note:", error));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleAddNote} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Create a New Note</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Note Subject" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea 
            placeholder="Write your note here..." 
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Plus size={20} className="mr-2" /> Save Note
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full">
            <div className="flex items-center text-blue-600 mb-3">
              <FileText size={20} className="mr-2" />
              <h4 className="text-lg font-semibold text-gray-800 flex-1">{note.subject}</h4>
            </div>
            <p className="text-gray-600 flex-1 whitespace-pre-wrap">{note.content}</p>
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400">
              <span>{note.date}</span>
              <button onClick={() => handleDelete(note.id)} className="text-gray-300 hover:text-red-500 transition-colors" title="Delete Note">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {notes.length === 0 && (
        <p className="text-center text-gray-400 py-8">No notes yet. Start writing!</p>
      )}
    </div>
  );
}