import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  activeBoard: null,
  showNewBaordForm: false,
};

const BASE_URL = `http://localhost:4000/boards`;

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    getBoards(state, action) {
      state.boards = action.payload;
    },
    addBoard(state, action) {
      state.boards.push(action.payload);
      state.showNewBaordForm = false;
    },
    deleteBoard(state, action) {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },

    setActiveBoard(state, action) {
      state.activeBoard = state.boards.find(
        (board) => board.id === action.payload
      );
    },
    boardFormToggle(state) {
      state.showNewBaordForm = !state.showNewBaordForm;
    },
    addTaskToBoard(state, action) {
      const { boardId, listType, task } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.type === listType);
        if (list) {
          list.tasks.unshift(task);
        }
      }

      state.activeBoard = board;
    },
    deleteTaskFromBoard(state, action) {
      const { boardId, listType, taskId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.type === listType);
        if (list) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
      }
      state.activeBoard = board;
    },
    moveTaskToList(state, action) {
      const { boardId, fromListType, toListType, task } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const fromList = board.lists.find((l) => l.type === fromListType);
        const toList = board.lists.find((l) => l.type === toListType);
        if (fromList && toList) {
          fromList.tasks = fromList.tasks.filter((t) => t.id !== task.id);
          toList.tasks.unshift({ ...task, state: toListType });
        }
      }
      state.activeBoard = board;
    },
    editTask(state, action) {
      const { boardId, listType, updatedTask } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const list = board.lists.find((l) => l.type === listType);
        if (list) {
          const taskIndex = list.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) [(list.tasks[taskIndex] = updatedTask)];
        }
      }
      state.activeBoard = board;
    },
    reorderBoards(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const boards = state.boards;
      const [moved] = boards.splice(fromIndex, 1);
      boards.splice(toIndex, 0, moved);
    },
    reorderTasksInList(state, action) {
      const { boardId, listType, fromIndex, toIndex } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return;
      const list = board.lists.find((l) => l.type === listType);
      if (!list) return;

      const tasks = list.tasks;
      const [moved] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, moved);

      state.activeBoard = board;
    },
  },
});

export function getBoards() {
  return async function (dispatch) {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();

      dispatch({ type: "boards/getBoards", payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function addBoard(newBoard) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newBoard),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "boards/addBoard", payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function deleteBoard(id) {
  return async function (dispatch) {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "boards/deleteBoard", payload: id });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function persistBoardChanges(boardId) {
  return async function (dispatch, getState) {
    try {
      const board = getState().boards.boards.find((b) => b.id === boardId);
      if (!board) return;

      const res = await fetch(`${BASE_URL}/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists: board.lists }),
      });

      if (!res.ok) throw new Error("Failed to persist changes");
      // Changes are already in Redux, just sync with server
    } catch (error) {
      console.error("Persist error:", error);
      throw error;
    }
  };
}

export const {
  setActiveBoard,
  boardFormToggle,
  addTaskToBoard,
  deleteTaskFromBoard,
  moveTaskToList,
  editTask,
  reorderBoards,
  reorderTasksInList,
} = boardsSlice.actions;

export default boardsSlice.reducer;
