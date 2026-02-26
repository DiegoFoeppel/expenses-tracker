export type Store = {
  expenses: Expense[];
  categories: string[];
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
};
