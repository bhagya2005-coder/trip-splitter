import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { Expense } from "./types";
import { expenses as sampleExpenses } from "./sampleData";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: sampleExpenses,
  reducers: {
    addExpense: (state, action: { payload: Expense }) => {
      state.push(action.payload);
    },
  },
});

export const { addExpense } = expenseSlice.actions;

export const store = configureStore({
  reducer: {
    expenses: expenseSlice.reducer,
  },
});