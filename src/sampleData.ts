import type { Member } from "./types";
import type { Expense } from "./types";

export const members: Member[] = [
  { id: "m1", name: "Aarav" },
  { id: "m2", name: "Diya" },
  { id: "m3", name: "Kabir" },
  { id: "m4", name: "Meera" },
  { id: "m5", name: "Rohan" },
];

export const expenses: Expense[] = [
  {
    id: "e1",
    description: "Villa",
    amount: 2400000,
    paidBy: "m1",
    date: "2026-11-20",
    category: "Stay",
    split: {
      type: "equal",
      memberIds: ["m1", "m2", "m3", "m4", "m5"],
    },
  },
  {
    id: "e2",
    description: "Dinner",
    amount: 325000,
    paidBy: "m2",
    date: "2026-11-20",
    category: "Food",
    split: {
      type: "equal",
      memberIds: ["m1", "m2", "m3", "m4"],
    },
  },
];