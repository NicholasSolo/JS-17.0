let money = 20000;
let income = "freelance";
let addExpenses = "internet, travelling, hobbies, fastfood";
let deposit = true;
let mission = 100000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log("Длина строки addExpenses - " + addExpenses.length + " символов");

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;

console.log("Дневной бюджет:", Math.trunc(budgetDay), "рублей");
