"use strict";

let money;
const income = "фриланс";
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую:",
  "Путешествия, покупки, развлечения"
);
const deposit = confirm("Есть ли у Вас депозит в банке?");

const mission = 100000;

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function start() {
  do {
    money = prompt("Ваш месячный доход", "");
  } while (!isNumber(money));
}

start();

function showTypeOf(variable) {
  return typeof variable;
}
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

const compulsoryExpenses = [];

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    compulsoryExpenses.push(prompt("Введите обязательную статью расходов?"));

    for (let j; !isNumber(j); ) {
      j = prompt("Во сколько это обойдется?");
      console.log("j:", j);
      if (isNumber(j)) {
        sum += +j;
      }
    }
  }
  return sum;
}

let expensesAmount = getExpensesMonth();
console.log("Сумма расходов за месяц:", expensesAmount);

console.log(
  "Перечень возможных расходов:",
  addExpenses.toLowerCase().split(",")
);

function getAccumulatedMonth(earnedMoney) {
  return earnedMoney - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(target, accumulated) {
  let period = Math.ceil(target / accumulated);
  if (period > 0) {
    return `Цель будет достигнута за ${period} месяца(-ев)`;
  } else {
    return "Цель не будет достигнута";
  }
}
console.log(getTargetMonth(mission, accumulatedMonth));

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
