// src/components/Task/TaskList.jsx
import { Droppable } from "react-beautiful-dnd";

export default function TaskList({ children, listType }) {
  return (
    <Droppable droppableId={listType} type="TASK">
      {(provided, snapshot) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col items-center justify-start h-85 w-full gap-5 pr-2 pb-2 overflow-x-hidden overflow-y-scroll noScrollbar  ${
            snapshot.isDraggingOver
              ? `bg-blue-50 rounded-lg w-fit mr-5 ${
                  listType === "toDo"
                    ? "dark:bg-gray-600"
                    : listType === "inProgress"
                    ? "dark:bg-amber-600/30"
                    : "dark:bg-green-800/30"
                } `
              : ""
          } `}
        >
          {children}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
