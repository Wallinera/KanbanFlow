import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../features/tasks/taskSlice";

function EditTaskForm({ setEditMode, selectedTask }) {
  const [newTaskName, setNewTaskName] = useState(selectedTask.taskName);
  const [newDescription, setNewDesctription] = useState(
    selectedTask.description
  );
  const { activeBoard } = useSelector((store) => store.boards);
  const dispatch = useDispatch();

  function handleCancel(e) {
    e.preventDefault();
    setEditMode(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      newTaskName === selectedTask.taskName &&
      newDescription === selectedTask.description
    ) {
      setEditMode(false);
      return;
    }

    const updatedTask = {
      taskName: newTaskName,
      description: newDescription,
      state: selectedTask.state,
      id: selectedTask.id,
      date: new Date().toISOString(),
    };
    dispatch(updateTask(activeBoard.id, selectedTask.state, updatedTask));
    setEditMode(false);
  }

  return (
    <form
      className={`flex flex-col gap-5  shadow-lg rounded-lg w-full  p-4  ${
        selectedTask.state === "toDo"
          ? "bg-gray-300  dark:bg-gray-600"
          : selectedTask.state === "inProgress"
          ? "bg-amber-200 dark:bg-amber-500/20"
          : "bg-green-200 dark:bg-green-600/20"
      }`}
      onSubmit={handleFormSubmit}
    >
      <div className="flex items-center justify-between  gap-2 max-lg:flex-col max-lg:text-center">
        <label className="w-full dark:text-gray-300">Task Name:</label>
        <input
          type="text"
          value={newTaskName}
          placeholder="The new task name..."
          onChange={(e) => setNewTaskName(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 dark:placeholder:text-gray-200 dark:bg-gray-500 dark:text-gray-300 focus:outline-none  max-md:w-full max-md:text-sm"
          maxLength={20}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-2 max-lg:flex-col max-lg:text-center">
        <label className="w-full dark:text-gray-300">Description:</label>
        <input
          type="text"
          value={newDescription}
          placeholder="The new task description..."
          onChange={(e) => setNewDesctription(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 dark:placeholder:text-gray-200 dark:bg-gray-500 dark:text-gray-300 focus:outline-none max-md:w-full max-md:text-sm"
          required
          maxLength={100}
        />
      </div>
      <div className="flex items-center justify-center gap-5 max-md:gap-2">
        <button className="text-xl  ring-1 px-4 py-1 mt-3 rounded-full cursor-pointer hover:bg-white dark:text-gray-300 dark:ring-gray-300 duration-200 dark:hover:bg-gray-500 dark:hover:ring-gray-500  max-md:text-lg">
          Save
        </button>

        <button
          className="text-xl    px-4 py-1 mt-3 rounded-full cursor-pointer bg-red-500 text-white hover:bg-red-500/0 hover:text-black hover:ring-1 duration-200 dark:bg-red-700 max-md:w-full max-md:text-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
