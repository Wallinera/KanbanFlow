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
          ? "bg-gray-300"
          : selectedTask.state === "inProgress"
          ? "bg-amber-200"
          : "bg-green-200"
      }`}
      onSubmit={handleFormSubmit}
    >
      <div className="flex items-center justify-between gap-2">
        <label className="w-full">Task Name:</label>
        <input
          type="text"
          value={newTaskName}
          placeholder="The new task name..."
          onChange={(e) => setNewTaskName(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 focus:outline-none"
          maxLength={20}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <label className="w-full">Description:</label>
        <input
          type="text"
          value={newDescription}
          placeholder="The new task description..."
          onChange={(e) => setNewDesctription(e.target.value)}
          className="bg-white w-fit px-4 py-1 rounded-full placeholder:text-gray-400 focus:outline-none"
          required
          maxLength={100}
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <button className="text-xl  ring-1 px-4 py-1 mt-3 rounded-full cursor-pointer hover:bg-white duration-200">
          Save
        </button>

        <button
          className="text-xl    px-4 py-1 mt-3 rounded-full cursor-pointer bg-red-500 text-white hover:bg-red-500/0 hover:text-black hover:ring-1 duration-200"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
