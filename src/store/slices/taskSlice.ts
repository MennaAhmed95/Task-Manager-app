import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Task, mockTasks } from "../../data/mockData";

interface TaskState {
  tasks: Task[];
  filter: "all" | "New" | "Active" | "Closed";
  searchQuery: string;
  selectedCategory: "all" | "Dev" | "Test" | "UI" | "DB";
}

const initialState: TaskState = {
  tasks: mockTasks,
  filter: "all",
  searchQuery: "",
  selectedCategory: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask: Task = {
        ...action.payload,
        id: Math.max(...state.tasks.map((t) => t.id), 0) + 1,
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: number | string; updates: Partial<Task> }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.updates);
      }
    },
    deleteTask: (state, action: PayloadAction<number | string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "New" | "Active" | "Closed">
    ) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<"all" | "Dev" | "Test" | "UI" | "DB">
    ) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSearchQuery,
  setSelectedCategory,
} = taskSlice.actions;

export default taskSlice.reducer;
