import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasks/taskSlice";
import boardsReducer from "./features/boards/boardSlice";
import uiReducer from "./features/ui/uiSlice";
import { saveBoards } from "./utils/storage";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    boards: boardsReducer,
    ui: uiReducer,
  },
});

let prevBoards;
store.subscribe(() => {
  const stateBoards = store.getState().boards.boards;
  if (stateBoards !== prevBoards) {
    saveBoards(stateBoards);
    prevBoards = stateBoards;
  }
});

export default store;
