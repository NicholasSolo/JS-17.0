"use strict";

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
} // Вспомогательная функция проверки на число

let money;

function start() {
  do {
    money = +prompt("Ваш месячный доход", "");
  } while (!isNumber(money));
}
start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addINcome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 12,
  asking() {
    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую:",
      "Путешествия, покупки, развлечения"
    );
    this.addExpenses = addExpenses.toLowerCase().split(",");
    this.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let compulsoryExpense = prompt("Введите обязательную статью расходов?");
      let compulsoryExpenseCost;

      let temp = 0;
      do {
        temp = prompt("Во сколько это обойдется?");
      } while (!isNumber(temp));
      if (isNumber(temp)) {
        compulsoryExpenseCost = +temp;
      }

      this.expenses[compulsoryExpense] = compulsoryExpenseCost;
    }
  },

  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
    console.log("Сумма расходов за месяц:", this.expensesMonth);
  },

  getBudget() {
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth /30);
  },

  getTargetMonth() {
    let period = Math.ceil(this.mission / this.budgetMonth);
    if (period > 0) {
      console.log (`Цель будет достигнута за ${period} месяца(-ев)`);
    } else {
      console.log ("Цель не будет достигнута");
    }
  },

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      console.log ("У Вас высокий уровень дохода");
    } else if (this.budgetDay >= 600) {
      console.log ("У Вас средний уровень дохода");
    } else if (this.budgetDay <= 600) {
      console.log ("К сожалению, у Вас уровень дохода ниже среднего");
    } else if (this.budgetDay <= 0) {
      console.log ("Что-то пошло не так");
    } else {
      console.log ("Ошибка");
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log( key,'-', appData[key]);
}









