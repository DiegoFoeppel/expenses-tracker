import { type Expense, type Store } from "./types";

const getLocalStorage = () => {
  const data = localStorage.getItem("expenses");

  return data ? JSON.parse(data) : { expenses: [], categories: [] };
};

const saveToLocalStorage = (store: Store) => {
  localStorage.setItem("expenses", JSON.stringify(store));
};

export { getLocalStorage, saveToLocalStorage };
