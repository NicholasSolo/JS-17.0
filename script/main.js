"use strict";

const money = +prompt("Ваш месячный доход?", "35000");
const income = "фриланс";
const addExpenses = prompt( "Перечислите возможные расходы за рассчитываемый период через запятую:", "Путешествия, покупки, развлечения");
const deposit = confirm("Есть ли у Вас депозит в банке?");

const expenses1 = prompt("Введите обязательную статью расходов?", "ЖХК");
const cost1 = +prompt("Во сколько это обойдется?", "10000");

const expenses2 = prompt("Введите обязательную статью расходов?", "Проезд");
const cost2 = +prompt("Во сколько это обойдется?", "2000");

const mission = 100000;

function showTypeOf(variable) {
  return typeof variable;
}
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

function getExpensesMonth(sum1, sum2) {
  return sum1 + sum2;
}
console.log("Сумма расходов за месяц:", getExpensesMonth(cost1, cost2));

console.log(
  "Перечень возможных расходов:",
  addExpenses.toLowerCase().split(",")
);

function getAccumulatedMonth(earnedMoney, cost1, cost2) {
  return earnedMoney - (cost1 + cost2);
}
const accumulatedMonth = getAccumulatedMonth(money, cost1, cost2);

function getTargetMonth(target, accumulated) {
  return Math.ceil(target / accumulated);
}
console.log(
  "Меяцев до достижения цели:",
  getTargetMonth(mission, accumulatedMonth)
);

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Бюджет на день:", budgetDay, "рублей");

function getStatusIncome(budgetDay) {
  if (budgetDay >= 1200) {
    return "У Вас высокий уровень дохода";
  } else if (budgetDay >= 600) {
    return "У Вас средний уровень дохода";
  } else if (budgetDay <= 600) {
    return "К сожалению, у Вас уровень дохода ниже среднего";
  } else if (budgetDay <= 0) {
    return "Что-то пошло не так";
  } else {
    return "Ошибка";
  }
}
console.log(getStatusIncome(budgetDay));
