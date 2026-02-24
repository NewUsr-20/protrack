import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  // GET Request (Updated to Port 3000)
  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // POST Request (Updated to Port 3000)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTaskData = {
      title: title,
      brief_note: note,
      status: 'To-Do'
    };

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTaskData)
    })
      .then(response => response.json())
      .then(createdTask => {
        setTasks([...tasks, createdTask]); 
        setTitle('');
        setNote('');
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // DELETE Request (Updated to Port 3000)
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleAddTask} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add a New Task</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Brief note or context (optional)..." 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Plus size={20} className="mr-2" /> Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start group hover:border-blue-300 transition-colors">
            <button className="mt-1 text-gray-400 hover:text-green-500 flex-shrink-0">
              {task.status === 'Done' ? <CheckCircle className="text-green-500" size={24} /> : <Circle size={24} />}
            </button>
            <div className="ml-4 flex-1">
              <h4 className={`text-lg font-medium ${task.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {task.title}
              </h4>
              {task.brief_note && (
                <p className="text-gray-500 text-sm mt-1">{task.brief_note}</p>
              )}
            </div>
            <button onClick={() => handleDelete(task.id)} className="ml-4 text-gray-300 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2" title="Delete Task">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 py-8">No tasks here yet. You're all caught up!</p>
        )}
      </div>
    </div>
  );
}