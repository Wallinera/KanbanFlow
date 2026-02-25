import { createSlice } from "@reduxjs/toolkit";
import {
  loadBoards,
  saveBoards,
  saveOrUpdateBoard,
  removeBoard,
} from "../../utils/storage";

const persisted = loadBoards();
const initialState = {
  boards: persisted ?? [],
  activeBoard: null,
  showNewBaordForm: false,
};

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
        (board) => board.id !== action.payload,
      );
    },

    setActiveBoard(state, action) {
      state.activeBoard = state.boards.find(
        (board) => board.id === action.payload,
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
            (task) => task.id === updatedTask.id,
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
  return function (dispatch) {
    const data = loadBoards() || [];
    dispatch({ type: "boards/getBoards", payload: data });
  };
}

export function addBoard(newBoard) {
  return function (dispatch) {
    const boards = loadBoards() || [];
    const id = Date.now().toString();
    const boardToSave = { ...newBoard, id };
    boards.push(boardToSave);
    saveBoards(boards);
    dispatch({ type: "boards/addBoard", payload: boardToSave });
  };
}

export function deleteBoard(id) {
  return function (dispatch) {
    removeBoard(id);
    dispatch({ type: "boards/deleteBoard", payload: id });
  };
}

export function persistBoardChanges(boardId) {
  return function (dispatch, getState) {
    try {
      const board = getState().boards.boards.find((b) => b.id === boardId);
      if (!board) return;
      saveOrUpdateBoard(board);
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
