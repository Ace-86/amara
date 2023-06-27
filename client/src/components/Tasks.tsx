import React, { useState } from "react";
import TaskModal from "./TaskModal";
import Title from "./Title";
import {Link} from "react-router-dom"


type Task = {
  name: string;
  date: string;
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addTask = (task: string) => {
    const newTask: Task = {
      name: task,
      date: new Date().toLocaleDateString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (index: number, updatedTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, name: updatedTask } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditIndex(null);
    setModalOpen(false);
  };

  return (
    <div>
    <Title setMessages={undefined} />
    {/* link to task page */}
    < Link to="/tasks" className="ml-2">
      Link
    </Link>
    {/* cut off --------- */}

    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="mb-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          Add Task
        </button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p>{task.name}</p>
                <p className="text-gray-500 text-sm">{task.date}</p>
              </div>
              <div>
                <button
                  className="text-indigo-500 mr-2"
                  onClick={() => {
                    setEditIndex(index);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {modalOpen && (
        <TaskModal
          addTask={addTask}
          editTask={editTask}
          editIndex={editIndex}
          closeModal={closeModal}
        />
      )}
    </div>
    </div>
  );
};

export default Tasks;
