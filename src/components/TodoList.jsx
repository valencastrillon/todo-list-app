import { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto pt-16">
        <h1 className="text-2xl font-light text-gray-900 mb-8">
          Tareas
        </h1>

        {/* Input para agregar tareas */}
        <div className="flex gap-2 mb-8 pb-4 border-b border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nueva tarea"
            className="flex-1 px-0 py-2 border-0 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={addTask}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-0">
          {tasks.length === 0 ? (
            <p className="text-gray-400 py-8 text-sm">
              Sin tareas
            </p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 py-3 border-b border-gray-100 group"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border transition-all ${
                    task.completed
                      ? 'bg-gray-900 border-gray-900'
                      : 'border-gray-300'
                  }`}
                >
                  {task.completed && <Check size={12} className="text-white m-auto" />}
                </button>

                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Contador */}
        {tasks.length > 0 && (
          <div className="mt-8 text-xs text-gray-400">
            {tasks.filter(t => !t.completed).length} pendiente{tasks.filter(t => !t.completed).length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}