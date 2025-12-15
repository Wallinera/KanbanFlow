// src/components/Task/Task.jsx
import { useState } from "react";
import { deleteTask, updateTaskState } from "../../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import closeIcon from "../../assets/close-circle-sharp.svg";
import hamburgerIcon from "../../assets/menu-sharp.svg";
import EditTaskForm from "./EditTaskForm";

export default function Task({ task, index }) {
  const [showDescription, setShowDescription] = useState(false);
  const [taskStateMarker, setTaskStateMarker] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  function handleMenuBtn(e) {
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
    if (taskStateMarker) {
      setTaskStateMarker(false);
    }
  }

  function handleEdit(e) {
    e.stopPropagation();
    setEditMode(!editMode);
    setShowMobileMenu(!showMobileMenu);
  }

  if (editMode)
    return <EditTaskForm setEditMode={setEditMode} selectedTask={task} />;

  return (
    <Draggable draggableId={`task-${id}`} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative flex flex-col gap-5 bg-white dark:bg-gray-800 w-full p-3 pb-4 rounded-lg shadow-xl cursor-pointer  ${
            state === "toDo"
              ? "hover:bg-gray-200 "
              : state === "inProgress"
              ? "hover:bg-amber-100"
              : "hover:bg-green-100"
          } duration-200 ${
            snapshot.isDragging ? "opacity-50 shadow-2xl" : ""
          } dark:hover:bg-gray-400`}
          onClick={handleTaskClick}
        >
          {/* Top row: title & buttons */}
          <div className=" flex items-center justify-between dark:text-gray-300 max-md:gap-5 ">
            <p
              className={`text-lg wrap-anywhere dark:group-hover:text-black max-lg:mx-auto ${
                showMobileMenu && "hidden"
              } max-md:text-base`}
            >
              {taskName}
            </p>

            {/* Buttons */}
            <div
              className={`flex items-center gap-2 max-lg:w-full max-md:hidden ${
                showMobileMenu && "max-md:block"
              }`}
            >
              <button
                className="flex text-black hover:ring-2 px-2 py-1 rounded-lg duration-300 cursor-pointer dark:text-gray-300 dark:group-hover:text-black max-md:text-sm"
                onClick={handleMarkerWindow}
              >
                Mark as
              </button>
              <button
                className="flex items-center justify-center bg-secondary text-white px-3 py-1 rounded-full hover:opacity-75 duration-300 cursor-pointer max-md:text-sm"
                onClick={handleEdit}
              >
                Edit
              </button>
              <img
                src={closeIcon}
                className="w-6 h-6 hover:scale-110 duration-200 cursor-pointer rounded-full hover:bg-cyan-600 hover:invert dark:invert max-lg:ml-auto max-lg:mt-1 max-lg:mr-1 "
                onClick={handleDeleteTask}
                onKeyDown={(e) => e.key === "Enter" && handleDeleteTask(e)}
                tabIndex={0}
                alt="delete"
              />
            </div>

            {/* Menu Button for small screens*/}
            <img
              src={hamburgerIcon}
              alt="hamburger menu btn"
              className={`hidden w-6 mt-1 hover:scale-110 dark:invert  duration-200 cursor-pointer max-md:block ${
                showMobileMenu && "rotate-90"
              }`}
              onClick={handleMenuBtn}
            />
          </div>

          {/* Task description */}
          {showDescription && (
            <>
              <div className="absolute w-full h-px right-0 top-17 bg-gray-500/50" />
              <p className="text-gray-800 pt-3 w-full wrap-anywhere dark:text-gray-300 dark:group-hover:text-black">
                {description}
              </p>
            </>
          )}

          {/* Task state marker */}
          {taskStateMarker && (
            <div className="flex items-center justify-between max-lg:text-sm max-lg:text-center">
              <div className="absolute w-full h-px right-0 top-15 bg-gray-500/50" />

              <div className="flex items-center gap-1  ">
                {state !== "toDo" && (
                  <button
                    id="toDo"
                    className="text-gray-700 hover:bg-gray-100 duration-200 rounded-lg px-3 py-1 cursor-pointer  "
                    onClick={handleTaskMarking}
                  >
                    To Do 📝
                  </button>
                )}
                {state !== "inProgress" && (
                  <button
                    id="inProgress"
                    className="text-amber-700 hover:bg-amber-100 duration-200 rounded-lg px-3 py-1 cursor-pointer "
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
      )}
    </Draggable>
  );
}
