"use strict";

const money = +prompt("Ваш месячный доход?", "35000");
const income = "freelance";
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую:",
  "Путешествия, покупки, развлечения"
);
const deposit = confirm("Есть ли у Вас депозит в банке?");

const expenses1 = prompt("Введите обязательную статью расходов?", "ЖХК");
const cost1 = +prompt("Во сколько это обойдется?", "10000");

const expenses2 = prompt("Введите обязательную статью расходов?", "Проезд");
const cost2 = +prompt("Во сколько это обойдется?", "2000");

const budgetMonth = money - (cost1 + cost2);
console.log("Бюджет на месяц: ", budgetMonth);

const mission = 100000;
console.log(`Цель заработать ${mission} рублей`);

const period = Math.ceil(mission / budgetMonth);
console.log("Цель будет достигнута за", period, "месяца(-ев)");

const budgetDay = Math.floor(budgetMonth / 30);
console.log("Бюджет на день:", budgetDay, "рублей");

if (budgetDay >= 1200) {
     console.log("У Вас высокий уровень дохода");
    } else if (budgetDay >= 600 ) {
     console.log("У Вас средний уровень дохода");
    } else if (budgetDay <= 600 ) {
      console.log("К сожалению, у Вас уровень дохода ниже среднего");
    } else if (budgetDay <= 0) {
     console.log("Что-то пошло не так");
    } else {
      console.log("Ошибка");
}

console.log("----------------------------------------");

console.log(typeof money, typeof income, typeof deposit);

console.log("Длина строки addExpenses - " + addExpenses.length + " символов");

console.log(`Период равен ${period} месяцев`);

console.log(addExpenses.toLowerCase().split(","));
