const money = 20000;
const income = "freelance";
const addExpenses = "internet, travelling, hobbies, fastfood";
const deposit = true;
const mission = 100000;
const period = 12;
const budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);

console.log("Длина строки addExpenses - " + addExpenses.length + " символов");

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(","));

console.log("Дневной бюджет:", Math.trunc(budgetDay), "рублей");
