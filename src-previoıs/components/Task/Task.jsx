import { useState } from "react";
import { deleteTask, updateTaskState } from "../../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";

import closeIcon from "../../assets/close-circle-sharp.svg";
import EditTaskForm from "./EditTaskForm";

export default function Task({ task }) {
  const [showDescription, setShowDescription] = useState(false);
  const [taskStateMarker, setTaskStateMarker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { taskName, description, state, date, id } = task;

  const { activeBoard } = useSelector((store) => store.boards);
  const dispatch = useDispatch();

  function handleTaskClick(e) {
    e.stopPropagation();
    if (taskStateMarker) setTaskStateMarker(false);
    setShowDescription(!showDescription);
  }

  function handleMarkerWindow(e) {
    e.stopPropagation();
    if (showDescription) setShowDescription(false);
    setTaskStateMarker(!taskStateMarker);
  }

  function handleDeleteTask(e) {
    e.stopPropagation();
    dispatch(deleteTask(activeBoard.id, state, id));
  }

  function handleTaskMarking(e) {
    e.stopPropagation();
    const targetState = e.target.getAttribute("id");
    dispatch(
      updateTaskState(
        activeBoard.id,
        state,
        { taskName, description, state: targetState, date, id },
        targetState
      )
    );
  }

  function handleEdit(e) {
    e.stopPropagation();
    setEditMode(!editMode);
  }

  if (editMode)
    return <EditTaskForm setEditMode={setEditMode} selectedTask={task} />;

  return (
    <li
      className={`relative flex flex-col gap-5  bg-white w-full p-3 pb-4 rounded-lg shadow-xl  cursor-pointer ${
        state === "toDo"
          ? "hover:bg-gray-200"
          : state === "inProgress"
          ? "hover:bg-amber-100"
          : "hover:bg-green-100"
      } duration-200`}
      onClick={handleTaskClick}
    >
      {/*Task Name & buttons*/}
      <div className="flex items-center justify-between ">
        <p className="text-lg wrap-anywhere">{taskName}</p>

        {/*Buttons*/}
        <div className="flex items-center gap-2">
          <button
            className="flex  text-black hover:ring-2  px-2 py-1 rounded-lg duration-300 cursor-pointer"
            onClick={handleMarkerWindow}
          >
            Mark as
          </button>
          <button
            className="flex items-center justify-center bg-secondary text-white px-3 py-1 rounded-full hover:opacity-75 duration-300 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <img
            src={closeIcon}
            className="w-6 h-6 hover:scale-110 duration-200 cursor-pointer rounded-full hover:bg-cyan-600 hover:invert"
            onClick={handleDeleteTask}
            onKeyDown={(e) => e.key === "Enter" && handleDeleteTask(e)}
            tabIndex={0}
          />
        </div>
      </div>

      {/*Task Description*/}
      {showDescription && (
        <>
          <div className="absolute w-full h-px right-0 top-17 bg-gray-500/50" />

          <p className="text-gray-800 pt-3 w-full wrap-break-word ">
            {description}
          </p>
        </>
      )}

      {/*Task State Marker*/}
      {taskStateMarker && (
        <div className="flex items-center justify-between">
          <div className="absolute w-full h-px right-0 top-15 bg-gray-500/50" />
          <p>Mark as:</p>

          <div className="flex items-center gap-1">
            {state !== "toDo" && (
              <button
                id="toDo"
                className="text-gray-700 hover:bg-gray-100 duration-200 rounded-lg px-3 py-1 cursor-pointer"
                onClick={handleTaskMarking}
              >
                To Do 📝
              </button>
            )}
            {state !== "inProgress" && (
              <button
                id="inProgress"
                className="text-amber-700 hover:bg-amber-100 duration-200 rounded-lg px-3 py-1  cursor-pointer"
                onClick={handleTaskMarking}
              >
                In Progress ⏳
              </button>
            )}
            {state !== "done" && (
              <button
                id="done"
                className="text-green-700 hover:bg-green-100 duration-200 rounded-lg px-3 py-1 cursor-pointer"
                onClick={handleTaskMarking}
              >
                Done ✔
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
