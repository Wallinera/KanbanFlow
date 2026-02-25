import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskToBoard,
  deleteTaskFromBoard,
  moveTaskToList,
  editTask,
} from "../boards/boardSlice";
import { loadBoards, saveOrUpdateBoard } from "../../utils/storage";

const initialState = {
  isLoading: false,
};

const boardsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    taskDataUpdate(state, action) {
      state.taskDataUpdated = action.payload;
    },

    editTask: {
      prepare(name, description, id) {
        return { payload: { name, description, id } };
      },
    },
  },
});

export function addTask(boardId, listType, taskData) {
  return async function (dispatch) {
    dispatch({ type: "tasks/toggleIsLoading", payload: true });
    try {
      const boards = loadBoards() || [];
      const board = boards.find((b) => String(b.id) === String(boardId));

      const newTask = {
        ...taskData,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      const updatedLists = board.lists.map((list) =>
        list.type === listType
          ? { ...list, tasks: [newTask, ...list.tasks] }
          : list,
      );

      const updatedBoard = { ...board, lists: updatedLists };
      saveOrUpdateBoard(updatedBoard);

      // Dispatch to Redux to update local state
      dispatch(addTaskToBoard({ boardId, listType, task: newTask }));
    } catch (error) {
      console.error("addTask error:", error);
      throw error;
    } finally {
      dispatch({ type: "tasks/toggleIsLoading", payload: false });
    }
  };
}

export function deleteTask(boardId, listType, taskId) {
  return async function (dispatch) {
    dispatch({ type: "tasks/toggleIsLoading", payload: true });
    try {
      const boards = loadBoards() || [];
      const board = boards.find((b) => String(b.id) === String(boardId));

      const updatedLists = board.lists.map((list) =>
        list.type === listType
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list,
      );

      const updatedBoard = { ...board, lists: updatedLists };
      saveOrUpdateBoard(updatedBoard);
      dispatch(deleteTaskFromBoard({ boardId, listType, taskId }));
    } catch (error) {
      console.error("deleteTask error:", error);
      throw error;
    } finally {
      dispatch({ type: "tasks/toggleIsLoading", payload: false });
    }
  };
}

export function updateTask(boardId, listType, updatedTask) {
  return async function (dispatch) {
    dispatch({ type: "tasks/toggleIsLoading", payload: true });
    try {
      const boards = loadBoards() || [];
      const board = boards.find((b) => String(b.id) === String(boardId));

      const updatedLists = board.lists.map((list) => {
        if (list.type === listType) {
          const targetIndex = list.tasks.findIndex(
            (task) => task.id === updatedTask.id,
          );
          list.tasks[targetIndex] = updatedTask;
          return list;
        } else {
          return list;
        }
      });

      const updatedBoard = { ...board, lists: updatedLists };
      saveOrUpdateBoard(updatedBoard);

      dispatch(
        editTask({
          boardId,
          listType,
          updatedTask,
        }),
      );
    } catch (error) {
      console.error("deleteTask error:", error);
      throw error;
    } finally {
      dispatch({ type: "tasks/toggleIsLoading", payload: false });
    }
  };
}
export function updateTaskState(boardId, listType, targetTask, newTaskState) {
  return async function (dispatch) {
    dispatch({ type: "tasks/toggleIsLoading", payload: true });
    try {
      const boards = loadBoards() || [];
      const board = boards.find((b) => String(b.id) === String(boardId));

      const updatedLists = board.lists.map((list) =>
        list.type === newTaskState
          ? { ...list, tasks: [targetTask, ...list.tasks] }
          : list.type === listType
            ? {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== targetTask.id),
              }
            : list,
      );

      const updatedBoard = { ...board, lists: updatedLists };
      saveOrUpdateBoard(updatedBoard);

      dispatch(
        moveTaskToList({
          boardId,
          fromListType: listType,
          toListType: newTaskState,
          task: targetTask,
        }),
      );
    } catch (error) {
      console.error("deleteTask error:", error);
      throw error;
    } finally {
      dispatch({ type: "tasks/toggleIsLoading", payload: false });
    }
  };
}

export const { createTask } = boardsSlice.actions;

export default boardsSlice.reducer;
