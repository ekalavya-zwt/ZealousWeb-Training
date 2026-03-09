import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState(["Walk the dog", "Make bed", "Go to gym"]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = (event) => {
    event.preventDefault();
    if (task.trim() === "") return;

    if (editIndex !== null) {
      setTasks((prev) =>
        prev.map((item, index) => (index === editIndex ? task : item)),
      );
      setEditIndex(null);
    } else {
      setTasks((prev) => [...prev, task]);
    }

    setTask("");
  };

  const deleteTask = (deleteIndex) => {
    setTasks((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  const editTask = (text, position) => {
    setTask(text);
    setEditIndex(position);
  };

  return (
    <>
      <form onSubmit={addTask}>
        <label>Task:</label>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button type="button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button type="button" onClick={() => editTask(task, index)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
