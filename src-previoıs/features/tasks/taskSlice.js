import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskToBoard,
  deleteTaskFromBoard,
  moveTaskToList,
  editTask,
} from "../boards/boardSlice";

const initialState = {
  isLoading: false,
};

const BASE_URL = "http://localhost:4000";

const boardsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export function addTask(boardId, listType, taskData) {
  return async function (dispatch) {
    dispatch({ type: "tasks/toggleIsLoading", payload: true });
    try {
      const boardRes = await fetch(`${BASE_URL}/boards/${boardId}`);
      if (!boardRes.ok) throw new Error("Failed to fetch board");
      const board = await boardRes.json();

      const newTask = {
        ...taskData,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      const updatedLists = board.lists.map((list) =>
        list.type === listType
          ? { ...list, tasks: [newTask, ...list.tasks] }
          : list
      );

      const patchRes = await fetch(`http://localhost:4000/boards/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists: updatedLists }),
      });
      if (!patchRes.ok) throw new Error("Failed to update board");

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
      const boardRes = await fetch(`${BASE_URL}/boards/${boardId}`);
      if (!boardRes.ok) throw new Error("Failed to fetch board");
      const board = await boardRes.json();

      const updatedLists = board.lists.map((list) =>
        list.type === listType
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      );

      const patchRes = await fetch(`http://localhost:4000/boards/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists: updatedLists }),
      });
      if (!patchRes.ok) throw new Error("Failed to update board");
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
      const boardRes = await fetch(`${BASE_URL}/boards/${boardId}`);
      if (!boardRes.ok) throw new Error("Failed to fetch board");
      const board = await boardRes.json();

      const updatedLists = board.lists.map((list) => {
        if (list.type === listType) {
          const targetIndex = list.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          list.tasks[targetIndex] = updatedTask;
          return list;
        } else {
          return list;
        }
      });

      const patchRes = await fetch(`http://localhost:4000/boards/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists: updatedLists }),
      });
      if (!patchRes.ok) throw new Error("Failed to update board");

      dispatch(
        editTask({
          boardId,
          listType,
          updatedTask,
        })
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
      const boardRes = await fetch(`${BASE_URL}/boards/${boardId}`);
      if (!boardRes.ok) throw new Error("Failed to fetch board");
      const board = await boardRes.json();

      const updatedLists = board.lists.map((list) =>
        list.type === newTaskState
          ? { ...list, tasks: [targetTask, ...list.tasks] }
          : list.type === listType
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== targetTask.id),
            }
          : list
      );

      const patchRes = await fetch(`http://localhost:4000/boards/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists: updatedLists }),
      });
      if (!patchRes.ok) throw new Error("Failed to update board");

      dispatch(
        moveTaskToList({
          boardId,
          fromListType: listType,
          toListType: newTaskState,
          task: targetTask,
        })
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
