let data = {
  expenses: [
    {
      id: "c60ce0c5-d2de-4838-ba14-5def2ec33bd7",
      amount: 1000,
      category: "Viagem",
    },
    {
      id: "8e6f7c53-5870-41e0-a027-1dc5e277bdcb",
      amount: 160,
      category: "Periféricos",
    },
    { id: "28b5ee60-b583-449c-be9b-a9a8f99f2bb8", amount: 630, category: "Pc" },
  ],
  categories: [
    "Viagem",
    "Teste2",
    "Periféricos",
    "Construção",
    "comida",
    "teste3",
    "teste4",
    "pindoretama",
    "Pc",
  ],
};

let categories = data.expenses.map((item) => item.category);

console.log("categories", categories);

//resposta esperada
//[categories[0]: valorTotal, categories[2]:valorToal]
//[x, y, z]
