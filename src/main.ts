import ApexCharts from "apexcharts";
import { Expense, type Store } from "./types";
import { saveToLocalStorage, getLocalStorage } from "./localStorage";

const expenseForm = document.querySelector<HTMLFormElement>(".expense-form")!;
const categoryForm = document.querySelector<HTMLFormElement>(".category-form")!;
const categorias = document.querySelector<HTMLSelectElement>(".categorias")!;
const ulList = document.querySelector<HTMLUListElement>(".items")!;

let chart: ApexCharts;

let store: Store = { expenses: [], categories: [] };

const renderItems = (expenses: Expense[]) => {
  ulList.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    const span2 = document.createElement("span");

    span.textContent = String(expenses[i].amount);
    span2.textContent = expenses[i].category;

    li.appendChild(span);
    li.appendChild(span2);

    li.classList.add("list-item");

    ulList.appendChild(li);
  }
};

const renderCategories = (categories: string[]) => {
  categorias.innerHTML = "";
  categorias.innerHTML +=
    '<option value="" disabled selected>Selecione uma categoria</option>';

  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");

    option.setAttribute("value", String(i + 1));
    option.textContent = categories[i];

    categorias.appendChild(option);
  }
};

const saveExpense = (event: SubmitEvent) => {
  event.preventDefault();

  const amount = document.querySelector<HTMLInputElement>("#amount")!;
  const category = document.querySelector<HTMLSelectElement>(".categorias")!;
  const selectedCategory = Number(category.value);

  console.log("category", category.value, typeof category.value, category);

  const expense = {
    id: crypto.randomUUID(),
    amount: parseInt(amount.value),
    category: store.categories[selectedCategory - 1] || "Nenhuma",
  };

  store.expenses.push(expense);

  saveToLocalStorage(store);

  renderUI();

  expenseForm.reset();
};

const saveCategory = (event: SubmitEvent) => {
  event.preventDefault();

  const category = document.querySelector<HTMLInputElement>(".category");

  if (!category) return;
  console.log("category", category, category.value);

  const categoryValue = category.value;

  store.categories.push(categoryValue);

  saveToLocalStorage(store);

  renderUI();

  categoryForm.reset();

  alert(`Categoria ${categoryValue} foi salva.`);
};

expenseForm.addEventListener("submit", saveExpense);
categoryForm.addEventListener("submit", saveCategory);

const renderChart = (store: Store) => {
  const grouped = store.expenses.reduce<Record<string, number>>(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }

      acc[expense.category] += expense.amount;
      return acc;
    },
    {},
  );

  console.log("store2", store);

  console.log("grouped", grouped);

  const categories = Object.keys(grouped);
  const totals = Object.values(grouped);

  console.log("cat", categories);
  console.log(totals);

  chart.updateOptions({
    labels: categories,
  });
  chart.updateSeries(totals);
};

function renderUI() {
  renderItems(store.expenses);
  renderCategories(store.categories);

  console.log("store1", store);
  renderChart(store);
}

function main() {
  store = getLocalStorage();

  let options = {
    series: [],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  renderUI();
}

main();
