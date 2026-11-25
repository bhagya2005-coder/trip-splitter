export interface Member {
  id: string;
  name: string;
}

export interface Split {
  type: string;
  memberIds?: string[];
  shares?: Record<string, number>;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  category: string;
  split: Split;
}