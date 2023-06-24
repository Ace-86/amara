import React, { useState, useEffect } from "react";

type Props = {
  addTask: (task: string) => void;
  editTask: (index: number, task: string) => void;
  editIndex: number | null;
  closeModal: () => void;
};

const TaskModal: React.FC<Props> = ({
  addTask,
  editTask,
  editIndex,
  closeModal,
}) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      setTask(""); // Clear the task field when entering edit mode
    }
  }, [editIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    if (editIndex !== null) {
      editTask(editIndex, task);
    } else {
      addTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-70 z-10">
      <div className="bg-white p-8 rounded-lg w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={task}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              {editIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
