import { createSlice } from "@reduxjs/toolkit";
import {
  addTask_,
  updateTask_,
  deleteTask_,
  toggleTask_,
} from "./taskReducers";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
  },
  reducers: {
    addTask: addTask_,
    updateTask: updateTask_,
    deleteTask: deleteTask_,
    toggleTask: toggleTask_,
  },
});

export const { addTask, updateTask, deleteTask, toggleTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
