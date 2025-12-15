import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";

function NewTaskForm({ formType, setShowTaskForm }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { activeBoard } = useSelector((store) => store.boards);
  const dispatch = useDispatch();

  function handleFormSubmit(e) {
    e.preventDefault();
    const newTask = {
      taskName,
      description: taskDescription,
      state: formType,
    };
    dispatch(addTask(activeBoard.id, formType, newTask));
    setShowTaskForm(false);
  }

  return (
    <form
      className={`flex flex-col gap-5  shadow-lg rounded-lg w-full p-4 mr-4 ${
        formType === "toDo"
          ? "bg-gray-300 dark:bg-gray-600"
          : formType === "inProgress"
          ? "bg-amber-200 dark:bg-amber-500/20"
          : "bg-green-200 dark:bg-green-600/20"
      }`}
      onSubmit={handleFormSubmit}
    >
      <div className="flex items-center justify-between gap-2 max-lg:flex-col max-lg:text-center  ">
        <label className="w-full dark:text-gray-300">Task Name:</label>
        <input
          type="text"
          value={taskName}
          placeholder="Enter a task name..."
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 dark:placeholder:text-gray-200 dark:bg-gray-500 dark:text-gray-300 focus:outline-none max-md:w-full max-md:text-sm"
          maxLength={20}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-2  max-lg:flex-col max-lg:text-center">
        <label className="w-full dark:text-gray-300">Description:</label>
        <input
          type="text"
          value={taskDescription}
          placeholder="Enter a task description..."
          onChange={(e) => setTaskDescription(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 dark:placeholder:text-gray-200 dark:text-gray-300  dark:bg-gray-500 focus:outline-none  max-md:w-full max-md:text-sm"
          required
          maxLength={100}
        />
      </div>

      <button className="text-xl  mx-auto ring-1 px-4 py-1 mt-3 rounded-full cursor-pointer hover:bg-white duration-200 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:ring-gray-500  max-md:text-lg ">
        + Create Task
      </button>
    </form>
  );
}

export default NewTaskForm;
