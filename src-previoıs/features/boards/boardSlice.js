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
          toList.tasks.unshift(task);
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

export const {
  setActiveBoard,
  boardFormToggle,
  addTaskToBoard,
  deleteTaskFromBoard,
  moveTaskToList,
  editTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
