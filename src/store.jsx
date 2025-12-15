import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasks/taskSlice";
import boardsReducer from "./features/boards/boardSlice";
import uiReducer from "./features/ui/uiSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    boards: boardsReducer,
    ui: uiReducer,
  },
});

export default store;
