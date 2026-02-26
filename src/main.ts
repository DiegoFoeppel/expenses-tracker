import ApexCharts from "apexcharts";

const expenseForm = document.querySelector<HTMLFormElement>(".expense-form")!;
const categoryForm = document.querySelector<HTMLFormElement>(".category-form")!;

const categorias = document.querySelector<HTMLSelectElement>(".categorias")!;

const expenses = document.querySelector<HTMLDivElement>(".expenses")!;
const ulList = document.querySelector<HTMLUListElement>(".items")!;

const expensesList = JSON.parse(localStorage.getItem("expenses") || "[]");

const totalSpan = document.querySelector<HTMLSpanElement>(".total")!;

type Expense = {
  id: string;
  amount: number;
  category: string;
};

const selectOptions = [
  "Casa",
  "Mercado",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Transporte",
  "Trabalho",
  "Lazer",
];

// const expensesData = {
//   expenses: [{}, {}],
//   categories: ["..", "..", ".."],
// };

const getLocalStorage = () => {
  const data = localStorage.getItem("expenses");

  console.log("teste", data);

  // not data, data = null ou seja !null = true
  if (!data) return;

  console.log("Json", JSON.parse(data));
  return JSON.parse(data);
};

const saveToLocalStorage = (expense: Expense) => {
  console.log("expense", expense);
  if (!expense) return;
  console.log("expense2", expense);

  const items = getLocalStorage();

  console.log("expenses", items);

  let data = {
    ...items,
    expenses: [...items.expenses, expense],
  };

  console.log("data", data);

  localStorage.setItem("expenses", JSON.stringify(data));

  renderItems();
};

const loadLocalStorage = () => {
  const data = getLocalStorage();

  console.log("data", data);

  let expenses = {
    expenses: [],
    categories: [],
  };

  if (!data) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  console.log("data", data);

  return data;
};

loadLocalStorage();

const renderItems = () => {
  const items = getLocalStorage();

  if (!items) return;

  ulList.innerHTML = "";

  for (let i = 0; i < items.expenses.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    const span2 = document.createElement("span");

    span.textContent = items.expenses[i].amount;
    span2.textContent = items.expenses[i].category;

    li.appendChild(span);
    li.appendChild(span2);

    li.classList.add("list-item");

    ulList.appendChild(li);
  }
};

const renderCategories = () => {
  const items = getLocalStorage();

  if (!items) return;

  categorias.innerHTML = "";
  categorias.innerHTML +=
    '<option value="" disabled selected>Selecione uma categoria</option>';

  for (let i = 0; i < items.categories.length; i++) {
    const option = document.createElement("option");

    option.setAttribute("value", String(i + 1));
    option.textContent = items.categories[i];

    categorias.appendChild(option);
  }
};

renderItems();
renderCategories();

const saveExpense = (event: SubmitEvent) => {
  event.preventDefault();

  const amount = document.querySelector<HTMLInputElement>("#amount")!;
  const category = document.querySelector<HTMLSelectElement>(".categorias")!;
  const selectedCategory = Number(category.value);

  console.log("category", category.value, typeof category.value, category);

  const items = getLocalStorage();

  const expense = {
    id: crypto.randomUUID(),
    amount: parseInt(amount.value),
    category: items.categories[selectedCategory - 1] || "Nenhuma",
  };

  saveToLocalStorage(expense);

  expenseForm.reset();

  renderChart();
};

expenseForm.addEventListener("submit", saveExpense);

const saveCategory = (event: SubmitEvent) => {
  event.preventDefault();

  const category = document.querySelector<HTMLInputElement>(".category");

  if (!category) return;
  console.log("category", category, category.value);

  const categoryValue = category.value;

  const items = loadLocalStorage();

  const newCategories = [...items.categories, categoryValue];

  let data = {
    ...items,
    categories: newCategories,
  };

  console.log("data category", data);

  localStorage.setItem("expenses", JSON.stringify(data));

  categoryForm.reset();

  renderCategories();

  alert(`Categoria ${categoryValue} foi salva.`);
};

categoryForm.addEventListener("submit", saveCategory);

const renderChart = () => {
  const items = getLocalStorage();

  const grouped = items.expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }

    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // 2️⃣ Separar em dois arrays
  const categories = Object.keys(grouped);
  const totals = Object.values(grouped);

  console.log(categories);
  console.log(totals);

  var options = {
    series: totals,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: categories,
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
  var chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();
};

renderChart();
