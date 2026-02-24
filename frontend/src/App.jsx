import React, { useState } from 'react';
import { CheckSquare, StickyNote } from 'lucide-react';
import Tasks from './components/Tasks';
import Notes from './components/Notes'; // We added this import!

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">ProTrack</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('tasks')} 
            className={`flex items-center w-full p-3 rounded-lg font-medium transition-colors ${activeTab === 'tasks' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <CheckSquare className="mr-3" size={20} /> Tasks
          </button>
          
          <button 
            onClick={() => setActiveTab('notes')} 
            className={`flex items-center w-full p-3 rounded-lg font-medium transition-colors ${activeTab === 'notes' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <StickyNote className="mr-3" size={20} /> Notes
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeTab === 'tasks' ? 'My Tasks' : 'My Notes'}
            </h2>
            <p className="text-gray-500 mt-1">
              {activeTab === 'tasks' ? 'Manage your daily to-dos.' : 'Capture your thoughts.'}
            </p>
          </header>

          {/* DYNAMIC CONTENT AREA */}
          <div>
            {activeTab === 'tasks' ? (
              <Tasks /> 
            ) : (
              <Notes /> /* We replaced the placeholder div with your new component! */
            )}
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('tasks')} 
          className={`flex flex-col items-center p-2 w-full ${activeTab === 'tasks' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <CheckSquare size={24} className="mb-1" />
          <span className="text-xs font-medium">Tasks</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('notes')} 
          className={`flex flex-col items-center p-2 w-full ${activeTab === 'notes' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <StickyNote size={24} className="mb-1" />
          <span className="text-xs font-medium">Notes</span>
        </button>
      </nav>

    </div>
  );
}

export default App;