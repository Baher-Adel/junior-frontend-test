import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

const preloadedState = {
  tasks: {
    items: JSON.parse(localStorage.getItem("tasks")) || [],
  },
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks.items));
});