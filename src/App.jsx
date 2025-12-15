// src/App.jsx
import AppHeader from "./components/UI/AppHeader";
import AppLayout from "./components/UI/AppLayout";
import AppContent from "./components/UI/AppContent";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  moveTaskToList,
  reorderBoards,
  reorderTasksInList,
  persistBoardChanges,
} from "./features/boards/boardSlice";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AppFooter from "./components/UI/AppFooter";

function App() {
  const dispatch = useDispatch();
  const { activeBoard } = useSelector((store) => store.boards);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  function onDragEnd(result) {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Dragging boards (type="BOARD")
    if (type === "BOARD") {
      dispatch(
        reorderBoards({
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
      return;
    }

    // Dragging tasks within the same list (type="TASK")
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderTasksInList({
          boardId: activeBoard.id,
          listType: source.droppableId,
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
      // Persist to server
      dispatch(persistBoardChanges(activeBoard.id));
      return;
    }

    // Dragging tasks across lists
    const taskId = draggableId.replace("task-", "");
    const fromListType = source.droppableId;
    const toListType = destination.droppableId;

    const task = activeBoard.lists
      .find((l) => l.type === fromListType)
      ?.tasks.find((t) => String(t.id) === taskId);

    if (task) {
      dispatch(
        moveTaskToList({
          boardId: activeBoard.id,
          fromListType,
          toListType,
          task,
        })
      );
      // Persist to server
      dispatch(persistBoardChanges(activeBoard.id));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppLayout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </AppLayout>
    </DragDropContext>
  );
}

export default App;
