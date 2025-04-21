import React, { useState, useRef } from "react";

export default function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false, priority: "medium" }]);
            setTask("");
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") addTask();
    };

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const setPriority = (index, priority) => {
        const newTasks = [...tasks];
        newTasks[index].priority = priority;
        setTasks(newTasks);
    };

    return (
        <div className="app">
            <h1>My Tasks</h1>
            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Task input"
                />
                <button onClick={addTask} aria-label="Add task">Add</button>
            </div>
            <ul className="task-list">
                {tasks.length === 0 && <li className="empty">No tasks yet! Add some.</li>}
                {tasks.map((t, i) => (
                    <li key={i} className={`task ${t.completed ? "completed" : ""} ${t.priority}`}>
                        <span
                            onClick={() => toggleComplete(i)}
                            className={`task-text ${t.completed ? "completed-text" : ""}`}
                            tabIndex={0}
                            role="button"
                            aria-pressed={t.completed}
                            onKeyDown={e => { if (e.key === "Enter") toggleComplete(i); }}
                        >
                            {t.text}
                        </span>
                        <div className="task-actions">
                            <select
                                value={t.priority}
                                onChange={e => setPriority(i, e.target.value)}
                                aria-label={`Set priority for task: ${t.text}`}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(i)}
                                aria-label={`Delete task: ${t.text}`}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
