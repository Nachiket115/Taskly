export default function TodoItem({ task, index, toggleComplete, deleteTask }) {
    return (
      <li className="flex justify-between items-center mb-2 p-2 border rounded bg-white">
        <span
          onClick={() => toggleComplete(index)}
          className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
        >
          {task.text}
        </span>
        <button className="text-red-500" onClick={() => deleteTask(index)}>Delete</button>
      </li>
    );
  }
    